import mongoose from "mongoose";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const connectMongoDB = async () => {
    try {
        console.log(`MONGO_URI: ${process.env.MONGO_URI}`); // In ra để kiểm tra
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};

export default connectMongoDB;

