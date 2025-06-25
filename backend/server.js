import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectDB from "./config/db.js"
import authRoutes from './routes/authRoutes.js';
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || '*', // allow frontend domain or all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());

app.use("/api/v1/auth",authRoutes);

// Serve uploads folder
app.use("/uploads", express.static(path.resolve('uploads'))); 

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
