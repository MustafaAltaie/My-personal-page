import mongoose, { mongo } from 'mongoose';

const frontendSkillsSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String }
});

const FrontendSkills = mongoose.model('FrontendSkill', frontendSkillsSchema);

export default FrontendSkills;