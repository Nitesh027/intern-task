import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const connectionString = process.env.MONGO_URI || 'mongodb://localhost:27017/mern-task';
        const conn = await mongoose.connect(connectionString);
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('Database connection error:', error.message);
        process.exit(1);
    }
};

export default connectDB;