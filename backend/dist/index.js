import express from "express";
const app = express();
//middlewares
app.use(express.json());
//connections and listeners
//Port listener
app.listen(5000, () => {
    console.log(`Server running on port 5000`);
});
//# sourceMappingURL=index.js.map