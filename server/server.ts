import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import "dotenv/config";
import express, { Request, Response } from 'express';
import cors from "cors";
import connectDB from "./configs/db.js";
import session from 'express-session';
import MongoStore from 'connect-mongo';

declare module 'express-session' {
    interface SessionData {
        isLoggedIn: boolean;
        userId: string;
    }
}

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'],
    credentials: true
}));

app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
    // store: MongoStore.create({
    //     mongoUrl: process.env.MONGO_URI
    // })
}));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Startup error:", err);
        process.exit(1);
    }
};

startServer();