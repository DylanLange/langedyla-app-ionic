import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { PokemonServiceProvider } from '../../providers/pokemon-service/pokemon-service';
import { MyDataProvider } from '../../providers/my-data/my-data';
import { pokemonExistsInFavouriteArray } from '../../utils/utils';
import Favourite from '../../data/models/favourite';
import { Pokemon } from '../../data/models/pokemon';
import { Species } from '../../data/models/species';
import { SpeciesEntry } from '../../data/models/speciesentry';

/**
 * Generated class for the PokedexPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pokedex',
  templateUrl: 'pokedex.html',
})
export class PokedexPage {

  loading: Loading;

  pokemon: Object;
  descriptionText: String = "";
  favouriteBtnColor = "not_favourite";
  searchQuery: String = "";
  presenter: Presenter;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pokemonServiceProvider: PokemonServiceProvider,
    public loadingCtrl: LoadingController,
    public myDataProvider: MyDataProvider
  ) {
    this.presenter = new PokedexPresenter(this, pokemonServiceProvider, myDataProvider);

    this.loadingCtrl = loadingCtrl;
  }

  search(event: any) {
    this.presenter.searchEntered(this.searchQuery);
  }

  showLoader() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });//reinitialise because you can't reuse them apparently
    this.loading.present();
  }

  hideLoader() {
    this.loading.dismiss();
  }

  setPokemonData(pokemon: Object, flavorText: String) {
    this.pokemon = pokemon;
    this.descriptionText = flavorText;
  }

  setIsFavourited(isFavourited: Boolean) {
    this.favouriteBtnColor = isFavourited ? "favourite" : "not_favourite";
  }

}

class PokedexPresenter implements Presenter {

  currentPokemon: any;
  currentPokemonDescription: String;

  constructor(
    public view: PokedexPage,
    public pokemonServiceProvider: PokemonServiceProvider,
    public myDataProvider: MyDataProvider
  ) {
    
  }

  searchEntered(query: String) {
    console.log(query);
    this.view.showLoader();
    this.fetchPokemon(query);
  }

  favouriteClicked() {
    this.view.showLoader();

    this.myDataProvider.getFavourites()
      .then((favourites) => {
        var isFavourited = pokemonExistsInFavouriteArray(this.currentPokemon, favourites);

        if (isFavourited) {
          this.myDataProvider.removeFavouriteById(this.currentPokemon.id);
        } else {
          this.myDataProvider.addToFavourites(
            new Favourite(
              this.currentPokemon.id,
              this.currentPokemon.name,
              this.currentPokemon.sprites.front_default,
              this.currentPokemonDescription
            )
          );
        }

        this.view.setIsFavourited(!isFavourited);

        this.view.hideLoader();
      });
  }

  fetchPokemon(pokemonIdOrName: String) {
    this.pokemonServiceProvider.getPokemonByIdOrName(pokemonIdOrName)
      .then(
        pokemon => {
          if (pokemon !== undefined) {
            console.log("got pokemon " + pokemon);
            this.currentPokemon = pokemon;
            this.fetchSpecies(pokemon);
          }
          return pokemon;
        }
      )
      .catch(error => {
        this.view.hideLoader();
        console.log(error);
      });
  }

  fetchSpecies(pokemon: Pokemon) {
    console.log("trying to get species from " + pokemon.species.url);
    this.pokemonServiceProvider.getFromEndpoint(pokemon.species.url)
      .then(
        (species: Species) => {
          this.view.hideLoader();
          if (species !== undefined) {
            var englishFlavour = this.englishFlavour(species.flavor_text_entries);
            this.view.setPokemonData(pokemon, englishFlavour.flavor_text);
            this.currentPokemonDescription = englishFlavour.flavor_text;
            this.updateFavouritedIcon();
          }
          return species;
        }
      )
      .catch(error => {
        this.view.hideLoader();
        console.log(error);
      });
  }

  updateFavouritedIcon() {
    this.myDataProvider.getFavourites()
      .then((favourites) => {
        var isFavourited = pokemonExistsInFavouriteArray(this.currentPokemon, favourites);
        this.view.setIsFavourited(isFavourited);
      });
  }

  englishFlavour(flavour: Array<SpeciesEntry>): SpeciesEntry {
    for (var i = 0; i < flavour.length; i++) {
      if (flavour[i].language.name == "en") {
        console.log("filtered flavour: " + flavour[i]);
        return flavour[i];
      }
    }
  }

}

interface View {
  showLoader();
  hideLoader();
  setPokemonData(pokemon: Pokemon, species: Species);
  setIsFavourited(isFavourited: Boolean);
}

interface Presenter {
  searchEntered(query: String);
  favouriteClicked();
}