import mongoose from "mongoose";
import Person from "./model/Person.js";
import "dotenv/config.js";

mongoose.connect(process.env.DB_URL);

// const newPerson = new Person({
// 	name: "John Doe",
// 	age: 25,
// 	favoriteFoods: ["Pizza", "Burger"],
// });

// newPerson
// 	.save()
// 	.then((data) => {
// 		console.log("Record saved successfully:", data);
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 	});

// Define an array of people data
// const arrayOfPerson = [
// 	{ name: "John", age: 30, favoriteFoods: ["Pizza", "Pasta"] },
// 	{ name: "Jane", age: 25, favoriteFoods: ["Burger", "Sushi"] },
// 	{ name: "Bob", age: 35, favoriteFoods: ["Steak", "Chicken"] },
// ];

// // Create many records in the database
// Person.create(arrayOfPerson)
// 	.then((person) => {
// 		console.log("Records created successfully:", person);
// 	})
// 	.catch((err) => {
// 		console.error(err);
// 	});

// Specify the name to search for
const searchName = "John";

// Find all people with the specified name
Person.find({ name: searchName })
	.then((people) => {
		console.log(`People with the name ${searchName}:`, people);
	})
	.catch((err) => {
		console.error(err);
	});

// Specify the food to search for
const searchFood = "Pizza";

// Find one person with the specified food in favorites
Person.findOne({ favoriteFoods: searchFood })
	.then((person) => {
		if (person) {
			console.log(`Person with ${searchFood} in favorites:`, person);
		} else {
			console.log(`No person found with ${searchFood} in favorites.`);
		}
	})
	.catch((err) => {
		console.error(err);
	});

// Specify the person's _id to search for
const personId = "654d15f76a4d5b0a1d3f6567"; // Replace with the _id you want to search for

// Find the person with the specified _id
Person.findById(personId)
	.then((person) => {
		if (person) {
			console.log("Person found:", person);
		} else {
			console.log("No person found with the specified _id.");
		}
	})
	.catch((err) => {
		console.error(err);
	});

// Find the person by _id
Person.findById(personId)
	.then((person) => {
		if (person) {
			// Add "hamburger" to the list of favoriteFoods
			person.favoriteFoods.push("hamburger");

			// Mark favoriteFoods as modified
			person.markModified("favoriteFoods");

			// Save the updated person
			return person.save();
		} else {
			console.log("No person found with the specified _id.");
			return null;
		}
	})
	.then((updatedPerson) => {
		if (updatedPerson) {
			console.log("Person updated successfully:", updatedPerson);
			// Your stuff here
		}
	})
	.catch((err) => {
		console.error(err);
	});

// Specify the person's name to search for
const personName = "John";

// Update the person's age to 20
Person.findOneAndUpdate(
	{ name: personName },
	{ $set: { age: 20 } },
	{ new: true } // Return the updated document
)
	.then((updatedPerson) => {
		if (updatedPerson) {
			console.log("Person updated successfully:", updatedPerson);
			// Your stuff here
		} else {
			console.log(`No person found with the name ${personName}.`);
		}
	})
	.catch((err) => {
		console.error(err);
	});

const personDeleteId = "654d15f76a4d5b0a1d3f6567"; // Replace with the actual _id you want to delete

// Find and remove the person by _id
Person.findByIdAndRemove(personDeleteId)
	.then((removedPerson) => {
		if (removedPerson) {
			console.log("Person removed successfully:", removedPerson);
			// Your stuff here
		} else {
			console.log("No person found with the specified _id.");
		}
	})
	.catch((err) => {
		console.error(err);
	});

// Specify the name to search for and delete
const targetName = "Mary";

// Remove all people with the specified name
Person.deleteMany({ name: targetName })
	.then((result) => {
		console.log(`Removed all people with the name ${targetName}.`);
		console.log("Deletion result:", result);
		// Your stuff here
	})
	.catch((err) => {
		console.error(err);
	});

// Find people who like burritos
Person.find({ favoriteFoods: "burritos" })
	.sort({ name: 1 }) // Sort by name in ascending order
	.limit(2) // Limit the results to two documents
	.select({ age: 0 }) // Hide the age field
	.exec()
	.then((data) => {
		console.log("People who like burritos:", data);
		// Your stuff here
	})
	.catch((err) => {
		console.error(err);
	});
