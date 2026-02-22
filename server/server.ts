import "dotenv/config";
import express, { Request, Response } from 'express';
import cors from "cors";
import connectDB from "./configs/db";

const startServer = async () => {
    try {
        await connectDB();

        const app = express();

        app.use(cors());
        app.use(express.json());

        const port = process.env.PORT || 3000;

        app.get('/', (req: Request, res: Response) => {
            res.send('Server is Live!');
        });

        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });

    } catch (error) {
        console.error("DB connection failed:", error);
        process.exit(1);
    }
};

startServer();