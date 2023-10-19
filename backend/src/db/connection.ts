import { connect, disconnect } from 'mongoose';

const connectToDatabase = async () => {
    try {
        await connect(process.env.MONGODB_URL);
    } catch (err) {
        console.log(err);
        throw new Error("Cannot connect to MongoDB")
    }
}

const disconnnectFromDatabase = async () => {
    try {
        await disconnect();
    } catch (error) {
        console.log(error);
        throw new Error("Could not disconnect from MongoDB")
    }
}

export { connectToDatabase, disconnnectFromDatabase };