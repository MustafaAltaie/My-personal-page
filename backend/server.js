import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './Config/db.js';
import profileRoutes from './routes/profileRoutes.js';
import educationsRoutes from './routes/educationsRoutes.js';
import frontendSkillsRoutes from './routes/frontendSkillsRoutes.js';
import backendSkillsRoutes from './routes/backendSkillsRoutes.js';
import otherSkillsRoutes from './routes/otherSkillsRoutes.js';
import softSkillsRoutes from './routes/softSkillsRoutes.js';
import experiencesRoutes from './routes/experiencesRoutes.js';
import projectRoutes from './routes/projectsRoutes.js';
import emailRoutes from './routes/emailRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
connectDB();

app.use('/api/profile', profileRoutes);
app.use('/api/educations', educationsRoutes);
app.use('/api/frontendSkills', frontendSkillsRoutes);
app.use('/api/backendSkills', backendSkillsRoutes);
app.use('/api/otherSkills', otherSkillsRoutes);
app.use('/api/softSkills', softSkillsRoutes);
app.use('/api/experiences', experiencesRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/email', emailRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('App is running on port: ', PORT));