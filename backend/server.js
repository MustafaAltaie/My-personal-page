import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Config/db.js';
import profileRoutes from './routes/profileRoutes.js';
import educationsRoutes from './routes/educationsRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
connectDB();

app.use('/api/profile', profileRoutes);
app.use('/api/educations', educationsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('App is running on port: ', PORT));