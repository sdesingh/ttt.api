import mongoose, { Schema, Document} from 'mongoose';
import { generateVerificationKey } from '../../auth/Verification';

export interface IUser extends Document {
    email: string,
    password: string,
    age: number,
    isVerified: boolean
}


const UserSchema: Schema = new Schema(
  {
    email: { 
      type: String, 
      required: true, 
      unique: true,
      min: 3,
      max: 50
    },
    password: { type: String, required: true, select: false },
    age: { type: Number, required: true },

    // TODO: Fix user being able to pass in 
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationKey: {
      type: String,
      default: generateVerificationKey(),
      select: false
    }
  }, 

  // Don't allow users to save anything not in the schema.
  { strict:  true }

);




export default mongoose.model<IUser>('User', UserSchema);