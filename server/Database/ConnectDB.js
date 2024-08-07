
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const connectDB = async () => {
    try {
        if(!process.env.MONGO_URI) {
            console.error('MongoDB URI not found');
            process.exit(1);
        }

        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.name}`);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

module.exports = connectDB;