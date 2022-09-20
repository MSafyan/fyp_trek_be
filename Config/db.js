const { MongoExpiredSessionError } = require('mongodb');
const mongoose = require('mongoose');
const connectDB = async () => {
	try {
		var string = process.env.DATABASE_URI;
		if (process.env.NODE_ENV === 'development') {
			string = process.env.DATABASE_LOCAL;
		}
		const conn = await mongoose.connect(process.env.DATABASE_LOCAL);

		console.log(`"MongoDB Connected"${conn.connection.host}`.cyan.underline);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};
module.exports = connectDB;
