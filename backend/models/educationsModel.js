import mongoose from 'mongoose';

const education = new mongoose.Schema({
    title: { type: String },
    dateFrom: { type: String },
    dateTo: { type: String },
    content: { type: String },
    city: { type: String },
    country: { type: String },
    school: { type: String }
});

const Educations = mongoose.model('Education', education);

export default Educations;