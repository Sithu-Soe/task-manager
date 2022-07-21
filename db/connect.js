const mongoose = require("mongoose");
const connectionString =
	"mongodb+srv://sithu-strange:xNDy5Le64elcxo6z@cluster0.pnftnmb.mongodb.net/TASK-MANAGER?retryWrites=true&w=majority";

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
