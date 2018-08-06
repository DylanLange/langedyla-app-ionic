
export class UrlName {

    constructor(
        public url: String,
        public name: String
    ) {
        
    }

    getCapitalisedName(): String {
        return this.name.charAt(0).toUpperCase() + this.name.slice(1)
    }

}