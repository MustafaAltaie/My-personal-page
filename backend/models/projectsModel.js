import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    createdDate: { type: Date },
    content: { type: String, required: true },
    techStack: [{ type: String }],
    appLink: { type: String },
    isProfessional: { type: Boolean, default: false },
}, { timestamps: true });

const Projects = mongoose.model('Project', projectSchema);

export default Projects;