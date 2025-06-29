import "dotenv/config";
import express from "express";
import authRoutes from "./routes/authRoutes.js"
import { connectDB } from "./lib/InTouchDB.js";

const server = express();

server.get("/", (req, res) => {
  res.send("Hello, world! The server is running.");
});

server.use("/api/auth", authRoutes);

server.listen(process.env.PORT, () => {
  console.log('server started');
  connectDB();
})
