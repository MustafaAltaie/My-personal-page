import mongoose from 'mongoose';

const otherSkillsSchema = new mongoose.Schema({
    title: { type: String },
    description: { type: String }
});

const OtherSkills = mongoose.model('OtherSkill', otherSkillsSchema);

export default OtherSkills;