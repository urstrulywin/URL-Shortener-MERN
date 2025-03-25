import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected');
    } catch (error) {
        console.log('MongoDB Connection Error:', error.message);
        process.exit(1);
    }
}

const urlSchema = new mongoose.Schema(
    {
        shortURL: {
            type: String,
            required: true,
            unique: true,
        },
        longURL: {
            type: String,
            required: true,
        },
        visitCount: [{
            timestamp: {
                type: Number,
                default: Date.now,
            }
        }]
    },
    {
        timestamps: true
    }
);

const URL = mongoose.model('url', urlSchema);

export { URL, connectDB };