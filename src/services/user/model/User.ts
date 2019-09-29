import mongoose, { Schema, Document} from 'mongoose';
import { generateVerificationKey } from '../../auth/Verification';
import { IGame } from '../../ttt/model/TicTacToe';

export interface IUser extends Document {

    // Required when signing up.
    username: string,
    email: string,
    password: string,

    verificationKey: string,
    isVerified: boolean,
    currentGame: IGame,
    games: IGame[]
    gamesWon: number,
    gamesLost: number, 
    gamesTied: number
}

const UserSchema: Schema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,
    },
    password: { 
      type: String, 
      required: true, 
      select: false 
    },
    currentGame: {
      type: Schema.Types.ObjectId,
      ref: 'Game'
    },
    gamesWon: {
      type: Number,
      default: 0
    },
    gamesLost: {
      type: Number,
      default: 0
    },
    gamesTied: {
      type: Number,
      default: 0
    },
    isVerified: {
      type: Boolean,
      default: false
    },
    verificationKey: {
      type: String,
      default: generateVerificationKey(),
      select: false
    },
    games: [
      {
        type: Schema.Types.ObjectId, 
        ref: 'Game'
      }
    ],
  }, 

  // Don't allow users to save anything not in the schema.
  { strict:  true }

);

export default mongoose.model<IUser>('User', UserSchema);