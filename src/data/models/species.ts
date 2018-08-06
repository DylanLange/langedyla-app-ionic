import { UrlName } from "./urlname";
import { SpeciesEntry } from "./speciesentry";

export class Species {

    constructor(
        public capture_rate: Number,
        public habitat: UrlName,
        public color: UrlName,
        public flavor_text_entries: SpeciesEntry[]
    ) {

    }

}