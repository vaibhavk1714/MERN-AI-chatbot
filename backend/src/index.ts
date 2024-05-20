import app from "./app.js"
import { connectToDatabase } from "./db/connection.js"

//connections and listeners
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectToDatabase();
        app.listen(PORT, () => console.log("Server running and connected to database..."));
    } catch (error) {
        console.log(error);
    }
}

startServer();