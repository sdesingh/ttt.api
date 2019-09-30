import _ from 'lodash';
import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../../user/model/User';

export interface IGame extends Document {
  start_date: Date,
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
      default: " "
    }

  }

)

export default mongoose.model<IGame>('Game', GameSchema);


export class TicTacToe {

  static makeMove(moveIndex: number, moveChar: string, game: IGame, user: IUser): void {


    if(!this.validMove(game, moveIndex)) 
      return;

    game.grid[moveIndex] = moveChar;
    this.updateGameState(game, user);
    game.markModified('grid');

    return;
  }

  static validMove(game: IGame, index: number): boolean {
    if(index < 0 || index > 8) return false;
    else if(game.grid[index] != " ") return false;
    else return true;
  }

  static updateGameState(game: IGame, user: IUser): void {


    // Check if player won.
    if(this.checkForWinner(game, "X")){
      // Player won.
      // Update player wins.
      game.winner = "X";
      user.gamesWon += 1;
      return;
    }
    // Player didn't win.
    else {

      // Check if the game is tied if board full.
      if(this.isGameOver(game)){
        // Tie. Update player ties.
        user.gamesTied += 1;
        return;
      }

      // MAKE AI MOVE.
      this.makeAIMove(game, "O");
      
      // Check if the AI won.
      if(this.checkForWinner(game, "O")){

        // AI Won. Update player losses.
        user.gamesLost += 1;
        game.winner = "O";
        return;

      }
      else if(this.isGameOver(game)){
        user.gamesTied += 1;
        return;
      }
      else {
        // Game continues.
        return;
      }

    }
  }

  static checkForWinner(game: IGame, playerChar: string): boolean {

    // Check diagonals.
    const grid = game.grid;


    if(grid[0] == playerChar && grid[0] == grid[4] && grid[4] == grid[8]){
      console.log('diag1');
      return true;
    }
    else if(grid[2] == playerChar && grid[2] == grid[4] && grid[4] == grid[6]){
      console.log('diag2');
      return true;
    }


    else {

      for(let i = 0; i < 3; i++){

        // Check horizontals.
        let index = i * 3
        if(grid[index] == playerChar && grid[index] == grid[index + 1] && grid[index] == grid[index + 2]){
          console.log('horiz')
          return true;
        }

        // Check vertically.
        index = i;
        if(grid[index] == playerChar && grid[index] == grid[index + 3] && grid[index] == grid[index + 6]){
          console.log('vert')
          return true;
        }

      }

    }

    return false;
  }

  static isGameOver(game: IGame): boolean {
    return !game.grid.includes(" ") || game.winner != " ";
  }

  static makeAIMove(game: IGame, aiChar: string): void {

    for(let i = 0; i < 9; i++){
      if(game.grid[i] == " "){
        game.grid[i] = aiChar;
        return;
      }
    }
  }


  static createNewGame(): any {

    const grid: string[] = [];

    for(let i = 0; i < 9; i++){
      grid.push(' ');
    }

    const dateNow = Date.now().toString();

    return {
      grid: grid,
      start_date: dateNow,
      user: null,
      winner: " "
    };
  }
  
}


