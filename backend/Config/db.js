import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Successfully connected to DB');
    } catch (err) {
        console.error('❌ Faild to connect to DB:', err);
        process.exit(1);
    }
}

export default connectDB;