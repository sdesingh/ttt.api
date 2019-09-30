import { Request, Response } from 'express';
import Game, { TicTacToe } from './model/TicTacToe';
import { isUserLoggedIn } from '../user/UserController';
import User from '../user/model/User';
import { ERROR_RESPONSE } from '../../utils/httpsErrors';


export function listGames(req: Request, res: Response): void {

  console.log('listing games')
  
  if(!isUserLoggedIn(req)){
    res.json(ERROR_RESPONSE("You need to be logged in."));
  }

  const username = req.session!.username;

  User
    .findOne({ username: username })
    .populate('games')
    .exec(
      (err, user) => {


        if(err || !user) {
          res.json(ERROR_RESPONSE("Unable to list games for this user."));
        }

        const clientGames: any[] = [];

        user!.games.forEach(game => {

          clientGames.push({
            id: game._id,
            start_date: game.start_date
          })

        });

        res.json({
          status: "OK",
          games: clientGames
        })

      }
  )

}


export function getGame(req: Request, res: Response): void {

  console.log('getting game')

  if(!isUserLoggedIn(req)){
    res.json(ERROR_RESPONSE("You need to be logged in to check game states."));
  }

  const gameID = req.body.gameID;

  Game
    .findById(gameID)
    .exec(
      (err, game) => {
        if(err || !game) {
          res.json(ERROR_RESPONSE("Unable to find game with that ID."));
        }
        else {
          res.json({
            status: "OK",
            grid: game.grid,
            winner: game.winner
          })
        }
      }
    )

}


export function getScore(req: Request, res: Response): void {

  console.log('getting score')

  if(!isUserLoggedIn(req)){
    res.json(ERROR_RESPONSE("You need to be logged in to check your score."));
  }


  const username = req.session!.username;

  User
    .findOne({ username: username })
    .exec(
      (err, user) => {

        if(err || !user){
          res.json(ERROR_RESPONSE("An error occured while finding this user's score."))
        }
        else{
          res.json({
            status: "OK",
            human: user.gamesWon,
            wopr: user.gamesLost,
            tie: user.gamesTied
          })
        }

      }
    )

}

export async function makeMove(req: Request, res: Response): Promise<void> {

  // Get user.
  console.log('making move');

  User
    .findOne({username: req.session!.username })
    .populate('games')
    .populate('currentGame')
    .exec(
      async (err, user) => {
        
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

          // Check if this is the first time logging in.
          if(!user.currentGame || TicTacToe.isGameOver(user.currentGame)){
            await createNewGame(req);
            await makeMove(req, res);
            return;
          }
          
          let game = user!.currentGame;

          const result = TicTacToe.makeMove(moveIndex, "X", game, user);

          await game.save();
          await user.save();

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

export async function createNewGame(req: Request): Promise<void> {

  console.log(`creating new game`);


  // Check that the user is logged in.
  if(!isUserLoggedIn(req)){
    console.log("user not logged in")
  }

  // Create a new game.
  const username = req.session!.username
  
  await User
    .findOne(  { username:  username } )
    .populate('games')
    .populate('currentGame')
    .exec(

    async (err, user) => {

      if(!user || err){
        console.log(`An error occurred while try to create game for [${username}].`);
      }
      else {

        const newGameDoc = TicTacToe.createNewGame();
        newGameDoc.user = user._id;
        
        const newGame = new Game(newGameDoc);

        user.games.push(newGame);
        user.currentGame = newGame;

        user.markModified('games');
        user.markModified('currentGame');

        await newGame.save();
        await user.save()

        
      }


    }
    

  )

}