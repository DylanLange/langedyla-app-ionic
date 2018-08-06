import { UrlName } from "./urlname";

export class SpeciesEntry {

    constructor(
        public version: UrlName,
        public flavor_text: String,
        public language: UrlName
    ) {

    }

}