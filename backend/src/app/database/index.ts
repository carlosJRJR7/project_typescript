import mongoose, { mongo } from "mongoose";

const mongoURI = process.env.MONGO_URI


export default function connectToMongoDB(): void {
    if (mongoURI) {
        mongoose.connect(mongoURI)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((error) => {
            console.error("Erro ao conectar ao MongoDB:", error);
        });
    }
}