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
import homeImageRoutes from './routes/homeImageRoutes.js';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'https://mustafa-altaie-portfolio.netlify.app',
  'https://mustafaaltaie.uk',
  'https://www.mustafaaltaie.uk',
]
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin.toLowerCase())) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}
app.use(cors(corsOptions));

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
app.use('/api/homeImages', homeImageRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.post('/api/password-check', (req, res) => {
  const { password } = req.body;
  if(password === process.env.DASHBOARD_PASSWORD) {
    return res.json({ valid: true });
  }
  res.json({ valid: false });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('App is running on port: ', PORT));