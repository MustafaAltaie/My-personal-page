import mongoose from 'mongoose';

const experiencesSchema = new mongoose.Schema({
    company: { type: String },
    address: { type: String },
    dateFrom: { type: String },
    dateTo: { type: String },
    description: { type: String },
});

const Experiences = mongoose.model('Experience', experiencesSchema);

export default Experiences;