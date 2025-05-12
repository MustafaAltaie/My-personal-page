import mongoose from 'mongoose';

const backendSkillsSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String }
});

const BackendSkills = mongoose.model('BackendSkill', backendSkillsSchema);

export default BackendSkills;