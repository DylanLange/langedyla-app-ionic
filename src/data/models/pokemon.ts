import { Stat } from "./stat";
import { UrlName } from "./urlname";

export class Pokemon {

	constructor(
		public id: Number,
		public name: String,
		public base_experience: Number,
		public height: Number,
		public is_default: Boolean,
		public order: Number,
		public weight: Number,
		public stats: Stat[],
		public species: UrlName
	) {

	}

}