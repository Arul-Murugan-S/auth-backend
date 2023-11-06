const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MongoDB_URL);
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;