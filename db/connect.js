const mongoose = require("mongoose");

const connectDB = (url) => {
	// in version 6 mongoose, no need to use {} to specify the options to remove the deprecation warning.

	return mongoose.connect(url, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	});
	// .then(() => {
	//     console.log("MongoDB Connected...");
	// }).catch(err => console.log(err))
};

module.exports = connectDB;
