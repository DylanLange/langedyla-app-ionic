import { Favourite } from "../data/models/favourite";

export function pokemonExistsInFavouriteArray(pokemon: any, favourites: Favourite[]): Boolean {
    var hasElementWithId = function (element) {
      return element.id === pokemon.id;
    }
    return favourites.length === 0 ? false : favourites.some(hasElementWithId);
  }