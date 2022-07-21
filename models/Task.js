// Mongo DB Structure

// database -> table      -> row      -> column     (SQL)
// database -> collection -> document -> field      (NOSQL)
// model is a representation of collection
// mongoose model is a wrapper for mongoose schema
// the schema defines for the structure of the document like the types, validations etc...
// a mongoose model provides an interface for the database
// using the model will be able to create, update, query and delete our documents

const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
	name: {
		type: String,
		required: [true, "name must provide"],
		trim: true,
		maxlength: [20, "name can not be more than 20 characters"],
	},
	completed: { type: Boolean, default: false }, //Default value if no value pass
});

module.exports = mongoose.model("Task", TaskSchema);
