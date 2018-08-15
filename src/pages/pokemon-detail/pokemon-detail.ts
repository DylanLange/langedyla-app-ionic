import { Component } from '@angular/core';
import { Pokemon } from '../../data/models/pokemon';
import { Favourite } from '../../data/models/favourite';
import { IonicPage, Loading, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SpeciesEntry } from '../../data/models/speciesentry';
import { Species } from '../../data/models/species';
import { MyDataProvider } from '../../providers/my-data/my-data';
import { pokemonExistsInFavouriteArray } from '../../utils/utils';
import { PokemonServiceProvider } from '../../providers/pokemon-service';

/**
 * Generated class for the PokemonDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pokemon-detail',
  templateUrl: 'pokemon-detail.html',
})
export class PokemonDetailPage implements View {

  loading: Loading;
  presenter: Presenter;

  pokemon: Pokemon;
  descriptionText: String;
  favouriteBtnColor = "not_favourite";

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private pokemonServiceProvider: PokemonServiceProvider,
    private loadingCtrl: LoadingController,
    private myDataProvider: MyDataProvider
  ) {
    this.presenter = new PokemonDetailPresenter(this, pokemonServiceProvider, navParams.data, myDataProvider);
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

  setFullPokemonData(pokemon: Pokemon, description: String) {
    this.pokemon = pokemon;
    this.descriptionText = description;
  }

  setIsFavourited(isFavourited: Boolean) {
    this.favouriteBtnColor = isFavourited ? "favourite" : "not_favourite";
  }

}

class PokemonDetailPresenter implements Presenter {

  constructor(
    private view: View,
    private pokemonServiceProvider: PokemonServiceProvider,
    private favourite: Favourite,
    private myDataProvider: MyDataProvider
  ) {
    view.showLoader();
    pokemonServiceProvider.getPokemonByIdOrName("" + favourite.id)
      .then((pokemon) => {
        if (pokemon !== undefined) {
          this.getPokemonSpecies(pokemon);
        } else {
          //maybe show some error
        }
      });
  }

  getPokemonSpecies(pokemon: Pokemon) {
    this.pokemonServiceProvider.getFromEndpoint(pokemon.species.url)
      .then((species: Species) => {
        this.view.hideLoader();
        var englishFlavour: SpeciesEntry = this.englishFlavour(species.flavor_text_entries)
        this.view.setFullPokemonData(pokemon, englishFlavour.flavor_text);
        this.updateFavouritedIcon(pokemon);
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

  favouriteBtnClicked(currentPokemon: Pokemon, currentPokemonDescription: String) {
    this.view.showLoader();

    this.myDataProvider.getFavourites()
      .then((favourites) => {
        var isFavourited = pokemonExistsInFavouriteArray(currentPokemon, favourites);

        if (isFavourited) {
          this.myDataProvider.removeFavouriteById(currentPokemon.id);
        } else {
          this.myDataProvider.addToFavourites(
            new Favourite(
              currentPokemon.id,
              currentPokemon.name,
              currentPokemon.sprites.front_default,
              currentPokemonDescription
            )
          );
        }

        this.view.setIsFavourited(!isFavourited);

        this.view.hideLoader();
      });
  }

  updateFavouritedIcon(pokemon: Pokemon) {
    this.myDataProvider.getFavourites()
      .then((favourites) => {
        var isFavourited = pokemonExistsInFavouriteArray(pokemon, favourites);
        this.view.setIsFavourited(isFavourited);
      });
  }

}

interface View {
  showLoader();
  hideLoader();
  setFullPokemonData(pokemon: Pokemon, description: String);
  setIsFavourited(isFavourited: Boolean)
}

interface Presenter {
  favouriteBtnClicked(pokemon: Pokemon, description: String);
}
