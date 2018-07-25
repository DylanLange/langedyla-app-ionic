export class Pokemon {

	id: Number
	name: String
	base_experience: Number
	height: Number
	is_default: Boolean
	order: Number
	weight: Number

	constructor(
			id: Number, 
			name: String,
			base_experience: Number,
			height: Number,
			is_default: Boolean,
			order: Number,
			weight: Number) {
		this.id = id
		this.name = name
		this.base_experience = base_experience
		this.height = height
		this.is_default = is_default
		this.order = order
		this.weight = weight
	}

}