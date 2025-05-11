import express from 'express';
import Educations from '../models/educationsModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newEducation = new Educations(req.body);
        const savedEducation = await newEducation.save();
        res.status(201).json(savedEducation);
    } catch (err) {
        console.error('Error creating education:',err);
        res.status(500).json({ message: "Couldn't create education" });
    }
});

router.get('/', async (req, res) => {
    try {
        const educations = await Educations.find();
        res.status(200).json(educations);
    } catch (err) {
        console.error('Error reading educations:', err);
        res.status({ message: 'Error reading educations' });
    }
});

router.put('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const updatedEducation = await Educations.findByIdAndUpdate(id, req.body, { new: true });
        if(!updatedEducation) return res.status(404).json({ message: 'Education not found' });
        res.status(200).json(updatedEducation);
    } catch (err) {
        console.error('Error updating education:', err);
        res.status(500).json({ message: 'Error updating education' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEducation = await Educations.findByIdAndDelete(id);
        if(!deletedEducation) return res.status(404).json({ message: 'Education not found' });
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting education:', err);
        res.status(500).json({ message: 'Error deleting education' });
    }
});

export default router;