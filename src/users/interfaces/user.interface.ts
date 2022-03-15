/* eslint-disable prettier/prettier */
import { Document } from 'mongoose';
export interface User extends Document {
    id?: string;
    name: string;
    bio: string;
    email: string;
    address: string;
    experience: string;
    techStack: string;
    education: string;
    phoneno: number;
    images: any[];
    gender: string;
    
  }
  