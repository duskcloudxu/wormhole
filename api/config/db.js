const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURL');

const {MONGO_USERNAME = 'root',
 MONGO_PASSWORD = 'example',
 MONGO_HOSTNAME = '127.0.0.1',
 MONGO_PORT = '27017',
 MONGO_DB = 'mongo'} = process.env;

 const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

const connectDB = async () => {
	console.log("DB")
	try {
        await mongoose.connect(url, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});	

		console.log('MongoDB WORMHOLE Connected...');
	} catch (err) {
		console.error(err.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
