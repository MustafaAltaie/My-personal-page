import mongoose from 'mongoose';

const softSkillsSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String }
});

const SoftSkills = mongoose.model('SoftSkill', softSkillsSchema);

export default SoftSkills;