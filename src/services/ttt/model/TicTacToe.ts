import _ from 'lodash';
import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../../user/model/User';

export interface IGame extends Document {
  start_date: Date,
  id: string,
  winner: string,
  grid: string[]
  user: IUser
}

const GameSchema: Schema = new Schema (

  {
    grid: {
      type: [String],
      required: true
    },
    start_date: {
      type: Date,
      default: Date.now
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      select: false
    },
    winner: {
      type: String,
      default: ""
    }

  }

)

export default mongoose.model<IGame>('Game', GameSchema);


class TicTacToe {

  static makeMove(moveIndex: number, moveChar: string, game: IGame): any {

    // TODO: Check if move is valid.
    if(!this.validMove(moveIndex)) 
      return;

    // TODO: Make the move.
    game.grid[moveIndex] = moveChar;

    // TODO: Update game state, find winner. 
    this.updateGameState(game);

    // TODO: Save changes to database. 
    game.save(

      (err, game) => {


        if(err)
        {
          return "An error occured while making this move."
        }
        else 
        {
          return game;
        }


      }

    )

    // TODO: Return JSON with the updated grid. 

    return {status: "ERROR"};
  }

  static validMove(index: number): boolean {
    if(index < 0 || index > 8) return false;
    else return true;
  }

  static updateGameState(game: IGame): void {

    this.checkForWinner(game);
  }

  static checkForWinner(game: IGame): boolean {
    return true;
  }
  
}


