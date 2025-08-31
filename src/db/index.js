import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGO_URI}/${DB_NAME}`
        );

        console.log(`\n✅ MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1); // stop the app if DB connection fails
    }
};

export default connectDB;
