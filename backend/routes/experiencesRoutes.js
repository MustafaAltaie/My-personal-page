import express from 'express';
import Experiences from '../models/experiencesModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newExperience = new Experiences(req.body);
        const savedExperience = await newExperience.save();
        res.status(201).json(savedExperience);
    } catch (err) {
        console.error('Error creating experience:',err);
        res.status(500).json({ message: "Couldn't create experience" });
    }
});

router.get('/', async (req, res) => {
    try {
        const experience = await Experiences.find();
        res.status(200).json(experience);
    } catch (err) {
        console.error('Error reading experience:', err);
        res.status({ message: 'Error reading experience' });
    }
});

router.put('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const updatedExperience = await Experiences.findByIdAndUpdate(id, req.body, { new: true });
        if(!updatedExperience) return res.status(404).json({ message: 'Experience not found' });
        res.status(200).json(updatedExperience);
    } catch (err) {
        console.error('Error updating experience:', err);
        res.status(500).json({ message: 'Error updating experience' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedExperience = await Experiences.findByIdAndDelete(id);
        if(!deletedExperience) return res.status(404).json({ message: 'Experience not found' });
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting experience:', err);
        res.status(500).json({ message: 'Error deleting experience' });
    }
});

router.put('/', async (req, res) => {
    try {
        const updatedExperiences = req.body;
        await Experiences.deleteMany({});
        const insertedExperiences = await Experiences.insertMany(updatedExperiences);
        res.status(200).json(insertedExperiences);
    } catch (err) {
        console.error('Error updating experience list:', err);
        res.status(500).json({ message: 'Error updating experience list' });
    }
});

export default router;