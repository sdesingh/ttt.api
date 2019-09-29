import { Request, Response } from 'express';
import Game, { TicTacToe } from './model/TicTacToe';
import { isUserLoggedIn } from '../user/UserController';
import User from '../user/model/User';
import { ERROR_RESPONSE } from '../../utils/httpsErrors';


export function listGames(res: Response): void {

  Game.find(

    (err, games) => {

      if(err){
        res.json( {status: "ERROR", message: "Unable to list games."} )
      }
      else {
        res.json( {status: "OK", games: games})
      }

    }
  )
    

}


export function makeMove(req: Request, res: Response): void {

  // Get user.

  User
    .findOne({username: req.session!.username })
    .populate('currentGame')
    .exec(
      (err, user) => {
        
        const moveIndex = req.body.move;

        if(err || !user) {
          res.json(ERROR_RESPONSE("Unable to make move."));
        }
        else if(moveIndex == null){
          res.json({
            status: "OK",
            grid: user!.currentGame.grid,
            winner: user!.currentGame.winner
          })
        }
        else {
          
          let game = user!.currentGame;

          const result = TicTacToe.makeMove(moveIndex, "X", game, user);

          game.save();
          user.save();


          if(TicTacToe.isGameOver(game)){
            createNewGame(req);
          }

          res.json({
            status: "OK",
            grid: game.grid,
            winner: game.winner
          });
        }
      }
    )

  


  // Check if the move is valid.

  // Make the move.

  // Update the game state.

  // If the game ends, create a new game for the user.
}

export function createNewGame(req: Request): boolean {


  // Check that the user is logged in.
  if(!isUserLoggedIn(req)){
    console.log("user not logged in")
    return false;
  }

  // Create a new game.
  const username = req.session!.username
  
  User.findOne(

    // Find user.
    { username:  username },

    (err, user) => {

      if(!user || err){
        console.log(`An error occurred while try to create game for [${username}].`);
        return false;
      }
      else {

        const newGameDoc = TicTacToe.createNewGame();
        newGameDoc.user = user._id;
        
        const newGame = new Game(newGameDoc);

        newGame.save(

          (err, game) => {


            if(err) {
              console.log(`An error occurred while try to create game for [${username}].`);
              console.log(`Error: ${err}`)
              return false;
            }

          }
        );

        user.games.push(newGame);
        user.currentGame = newGame;
        user.save((err, user) => {})

        // Game created successfully.
        return true;
        
      }


    }
    

  )

  return false;




}