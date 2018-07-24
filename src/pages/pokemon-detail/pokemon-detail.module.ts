import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PokemonDetailPage } from './pokemon-detail';

@NgModule({
  declarations: [
    PokemonDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PokemonDetailPage),
  ],
})
export class PokemonDetailPageModule {}
