export class Favourite {

	id: Number;
	name: String;
    imageUrl: String;
    description: String;

	constructor(
			id: Number, 
			name: String,
			imageUrl: String,
			description: String) {
		this.id = id;
		this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
	}

}