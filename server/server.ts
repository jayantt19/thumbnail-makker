import "dotenv/config";
import express, { Request, Response } from 'express';
import cors from "cors";
import connectDB from "./configs/db";
import session from "express-session"

declare module 'express-session'{
interface SessionData{
    isLoggedIn:boolean,
    userID:string
}
}
connectDB();
const app = express();

// Middleware
app.use(cors({
    origin:[' http://localhost:5173/','http://localhost:3000'],
    credentials:true
}))
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});