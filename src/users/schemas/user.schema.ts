/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    _id: { type: String, default: '' },
    name: { type: String, default: '' },
    bio: { type: String, default: '' },
    email: { type: String, default: '' },
    address: { type: String, default: '' },
    experience: { type: String, default: '' },
    techStack: { type: String, default: '' },
    education: { type: String, default: '' },
    phoneno: { type: Number, default: 0 }
  },
  {
    collection: 'users'
  }
  )

  UserSchema.set('timestamps', true);
  
  UserSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function(doc, ret) {
    delete ret._id;
  },
});