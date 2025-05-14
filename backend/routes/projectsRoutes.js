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

router.get('/', async (req, res) => {
    try {
        const projects = await Projects.find();
        res.status(200).json(projects);
    } catch (err) {
        console.error('Error reading projects:', err);
        res.status(500).json({ message: 'Error reading projects' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProject = await Projects.findByIdAndUpdate(id, req.body, { new: true });
        if(!updatedProject) return res.status(404).json({ message: 'Project not found' });
        res.status(200).json(updatedProject);
    } catch (err) {
        console.error('Error updating project:', err);
        res.status(500).json({ message: 'Error updating project' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProject = await Projects.findByIdAndDelete(id);
        if(!deletedProject) return res.status(404).json({ message: 'Project not found' });
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting projects:', err);
        res.status(500).json({ message: 'Error deleting projects' });
    }
});

router.put('/', async (req, res) => {
    try {
        const updatedList = req.body;
        await Projects.deleteMany({});
        const insertedProject = await Projects.insertMany(updatedList);
        res.status(200).json(insertedProject);
    } catch (err) {
        console.error('Error updating project:', err);
        res.status(500).json({ message: 'Error updating project' });
    }
});

export default router;