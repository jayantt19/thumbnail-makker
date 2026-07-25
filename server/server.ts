import dotenv from "dotenv";
import express, { Request, Response } from 'express';
import cors from "cors";
import connectDB from "./configs/db";
import session from "express-session"
import MongoStore from 'connect-mongo'
import AuthRouter from "./routes/AuthRoutes";


dotenv.config();

const token = process.env.HF_TOKEN;

declare module 'express-session'{
interface SessionData{
    isLoggedIn:boolean,
    userId:string
}
}

const app = express();

// Middleware
app.use(cors({
    origin:[' http://localhost:5173/','http://localhost:3000'],
    credentials:true
}))
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge: 1000 * 60 * 60 *24 * 7},
    store:MongoStore.create({
        mongoUrl:process.env.MONGODB_URI as string,
        collectionName:'sessions'
    })
}))
app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
    res.send('Server is Live!');
});

app.use('/api/auth',AuthRouter)

async function startServer() {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

startServer().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});