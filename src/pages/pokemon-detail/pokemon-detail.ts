import { Component } from '@angular/core';
import { Pokemon } from '../../data/models/pokemon';
import { Favourite } from '../../data/models/favourite';
import { PokemonServiceProvider } from '../../providers/pokemon-service/pokemon-service';
import { IonicPage, Loading, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SpeciesEntry } from '../../data/models/speciesentry';
import { Species } from '../../data/models/species';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pokemonServiceProvider: PokemonServiceProvider,
    public loadingCtrl: LoadingController
  ) {
    this.presenter = new PokemonDetailPresenter(this, pokemonServiceProvider, navParams.data);
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

}

class PokemonDetailPresenter implements Presenter {

  constructor(
    public view: View,
    public pokemonServiceProvider: PokemonServiceProvider,
    public favourite: Favourite
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
  setFullPokemonData(pokemon: Pokemon, description: String);
}

interface Presenter {


}
