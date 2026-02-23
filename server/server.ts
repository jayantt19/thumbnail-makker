import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db";

const startServer = async () => {
  try {
    await connectDB();

    const app = express();

    app.use(cors());
    app.use(express.json());

    const port = process.env.PORT || 3000;

    app.get("/", (_req, res) => {
      res.send("Server is Live!");
    });

    app.listen(port, () => {
      console.log(`🚀 Server running at http://localhost:${port}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();