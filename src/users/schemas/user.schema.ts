/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    name: String,
    bio: String,
    email: String,
    address: String,
    experience: String,
    techStack: String,
    education: String,
    phoneno: Number,

})