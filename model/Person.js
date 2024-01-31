import mongoose from "mongoose";

const personSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		default: 0,
	},
	favoriteFoods: {
		type: [String],
		default: [],
	},
});

const Person = mongoose.model("Person", personSchema);

export default Person;
