import express from 'express';
import SoftSkills from '../models/softSkillsModel.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newSkill = new SoftSkills(req.body);
        const savedSkill = await newSkill.save();
        res.status(201).json(savedSkill);
    } catch (err) {
        console.error('Error creating skill:', err);
        res.status(500).json({ message: 'Error creating skill' });
    }
});

router.get('/', async (req, res) => {
    try {
        const softSkills = await SoftSkills.find();
        res.status(200).json(softSkills);
    } catch (err) {
        console.error('Error reading skills:', err);
        res.status(500).json({ message: 'Error reading skills' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedSkill = await SoftSkills.findByIdAndUpdate(id, req.body, { new: true });
        if(!updatedSkill) return res.status(404).json({ message: 'Skill not found' });
        res.status(200).json(updatedSkill);
    } catch (err) {
        console.error('Error updating skills:', err);
        res.status(500).json({ message: 'Error updating skills' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSkill = await SoftSkills.findByIdAndDelete(id);
        if(!deletedSkill) return res.status(404).json({ message: 'Skill not found' });
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting skills:', err);
        res.status(500).json({ message: 'Error deleting skills' });
    }
});

router.put('/', async (req, res) => {
    try {
        const updatedList = req.body;
        await SoftSkills.deleteMany({});
        const insertedSkills = await SoftSkills.insertMany(updatedList);
        res.status(200).json(insertedSkills);
    } catch (err) {
        console.error('Error updating skills:', err);
        res.status(500).json({ message: 'Error updating skills' });
    }
});

export default router;