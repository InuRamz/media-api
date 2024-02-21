const mongoose = require("mongoose");

/**
 * Connect to db
 * @returns {Promise<string>}
 */
exports.connectDB = () => {
	return new Promise(async (resolve, reject) => {
		try {
			const string_uri = process.env.MONGO_URI ? process.env.MONGO_URI : null;
			const env = process.env.NODE_ENV ? process.env.NODE_ENV : null;
			await mongoose.connect(string_uri);
			resolve(`Successful connection to the database ${env}`);

		} catch (error) {
			reject(error);
		}
	});
}