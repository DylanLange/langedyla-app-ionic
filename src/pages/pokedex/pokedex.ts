import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { PokemonServiceProvider } from '../../providers/pokemon-service/pokemon-service';
import { Pokemon } from '../../data/models/Pokemon';
import { Storage } from '@ionic/storage';
import { MyDataProvider } from '../../providers/my-data/my-data';
import { Favourite } from '../../data/models/favourite';
import { pokemonExistsInFavouriteArray } from '../../utils/utils';

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
  loadingController: LoadingController;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pokemonServiceProvider: PokemonServiceProvider,
    public loadingCtrl: LoadingController,
    public storage: Storage,
    public myDataProvider: MyDataProvider
  ) {
    this.presenter = new PokedexPresenter(this, pokemonServiceProvider, storage, myDataProvider);

    this.loadingController = loadingCtrl;
  }

  search(event: any) {
    this.presenter.searchEntered(this.searchQuery);
  }

  showLoader() {
    this.loading = this.loadingController.create({
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

  view: View;
  pokemonServiceProvider: PokemonServiceProvider;
  storage: Storage;
  currentPokemon: any;
  currentPokemonDescription: String;
  myDataProvider: MyDataProvider;

  constructor(
    view: PokedexPage,
    pokemonServiceProvider: PokemonServiceProvider,
    storage: Storage,
    myDataProvider: MyDataProvider
  ) {
    this.view = view;
    this.storage = storage;
    this.pokemonServiceProvider = pokemonServiceProvider;
    this.myDataProvider = myDataProvider;
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
          this.myDataProvider.removeFavouriteById(this.currentPokemon.id)
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

  fetchSpecies(pokemon: any) {
    console.log("trying to get species from " + pokemon.species.url);
    this.pokemonServiceProvider.getFromEndpoint(pokemon.species.url)
      .then(
        species => {
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

  englishFlavour(flavour: Array<Object>): Object {
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
  setPokemonData(pokemon: Object, species: Object);
  setIsFavourited(isFavourited: Boolean);
}

interface Presenter {
  searchEntered(query: String);
  favouriteClicked();
}