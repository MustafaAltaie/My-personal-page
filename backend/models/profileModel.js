import mongoose from 'mongoose';

const profile = new mongoose.Schema({
    _id: { type: String, default: 'singleton_profile_text' },
    profile: { type: String }
}, { timestamps: true });

const Profile = mongoose.model('Profile', profile);

export default Profile;