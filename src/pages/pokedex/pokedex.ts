import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { PokemonServiceProvider } from '../../providers/pokemon-service/pokemon-service';
import { Pokemon } from '../../data/models/Pokemon';

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

  loading: LoadingController;

  pokemon: Object;
  descriptionText: String = "";
  searchQuery: String = "";
  presenter: Presenter;
  loadingController: LoadingController;

  constructor(public navCtrl: NavController, public navParams: NavParams, public pokemonServiceProvider: PokemonServiceProvider, public loadingCtrl: LoadingController) {
    this.presenter = new PokedexPresenter(this, pokemonServiceProvider);

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

  setPokemon(pokemon: Object, flavorText: String) {
    this.pokemon = pokemon;
    this.descriptionText = flavorText;//species.flavor_text_entries[2].flavor_text;
  }

}

class PokedexPresenter implements Presenter {

  view: View;
  pokemonServiceProvider: PokemonServiceProvider;

  constructor(view: PokedexPage, public pokemonServiceProvider: PokemonServiceProvider) {
    this.view = view;
    this.pokemonServiceProvider = pokemonServiceProvider;
  }

  searchEntered(query: String) {
    console.log(query);
    this.view.showLoader();
    this.fetchPokemon(query);
  }

  fetchPokemon(pokemonIdOrName: String) {
    this.pokemonServiceProvider.getPokemonByIdOrName(pokemonIdOrName)
      .then(
          pokemon => {
            if(pokemon !== undefined) {
              console.log("got pokemon " + pokemon);
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

  fetchSpecies(pokemon: Object) {
    console.log("trying to get species from " + pokemon.species.url);
    this.pokemonServiceProvider.getFromEndpoint(pokemon.species.url)
      .then(
          species => {
            this.view.hideLoader();
            if(species !== undefined) {
              var englishFlavour = this.englishFlavour(species.flavor_text_entries);
              console.log("got species " + species);
              console.log("flavor: " + englishFlavour);
              this.view.setPokemon(pokemon, englishFlavour.flavor_text);
            }
            return species;
          }
        )
      .catch(error => {
        this.view.hideLoader();
        console.log(error); 
      });
  }

  englishFlavour(flavour: Array<Object>): Object {
    for(var i = 0; i < flavour.length; i++) {
      if(flavour[i].language.name == "en") {
        console.log("filtered flavour: " + flavour[i]);
        return flavour[i];
      }
    }
  }

}

interface View {
  showLoader();
  hideLoader();
  setPokemon(pokemon: Object, species: Object);
}

interface Presenter {
  searchEntered(query: String);
}