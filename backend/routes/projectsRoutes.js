import express from 'express';
import Projects from '../models/projectsModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newProject = new Projects(req.body);
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (err) {
        console.error('Error creating project:', err);
        res.status(500).json({ message: 'Error creating project' });
    }
});

export default router;