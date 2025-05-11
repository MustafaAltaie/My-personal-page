import express from 'express';
import Profile from '../models/profileModel.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const profile = await Profile.findOne();
        if(!profile) return res.status(404).json({ message: 'Profile not found' });
        res.status(200).json(profile);
    } catch (err) {
        console.error("Couldn't read profile:", err);
        res.status(500).json({ message: 'Error reading profile text' });
    }
});

router.put('/', async (req, res) => {
    try {
        const updatedProfile = await Profile.findByIdAndUpdate('singleton_profile_text', { $set: req.body }, { new: true, upsert: true });
        res.status(200).json(updatedProfile);
    } catch (err) {
        console.error('Error while creating profile:', err);
        res.status(500).json({ message: 'Error occurred while creating profile' });
    }
});

export default router;