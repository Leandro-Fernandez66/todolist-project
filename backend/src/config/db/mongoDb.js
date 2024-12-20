require("dotenv").config();
const mongoose = require("mongoose");

const mongoUri = process.env.MONGODB_URI;

const connectMongoDb = async () => {
    try {
        mongoose.connect(mongoUri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
}

module.exports = { connectMongoDb }