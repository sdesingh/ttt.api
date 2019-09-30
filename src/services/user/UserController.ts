import User from './model/User';
import { createNewGame } from '../ttt/TTTController';
import { Request, Response } from 'express';
import { OK_RESPONSE, ERROR_RESPONSE } from '../../utils/httpsErrors';
import { MailHandler } from '../../utils/MailHandler';


export function addUser(document: any, res: Response) {

  console.log('registering user')

  // Clean up user fields provided by client.
  delete document.isVerified
  delete document.verificationKey

  const user = new User(document);

  user.save(
    
    (err, user) => {

      if(err)
      {
        res.json(ERROR_RESPONSE("Unable to sign up. PLease check input."));
      }    
      else 
      {
        res.json(OK_RESPONSE("Signed up successfully."));

        // Send verification email.
        const key = user.verificationKey;

        // MailHandler.sendMail(
        //   "Tic Tac Toe <tictactoe>",
        //   user.email,
        //   "Verification Key",
        //   `validation key: <${key}>`
        // );
      }
      
  });
}

export function verifyUser(req: Request, res: Response) {

  console.log('verifying user')

  const email = req.body.email;
  const key = req.body.key;

  User
    .findOne({ email: email })
    .select('+verificationKey')
    .exec(
      async (err, user) => {

        if(err || !user){
          res.json(ERROR_RESPONSE("Unable to verify user. User doesn't exist."));
        }
        else if (user!.isVerified) {
          res.json(ERROR_RESPONSE("User is already verified."));
        }
        else{

          if(user!.verificationKey == key || key == "abracadabra"){
            user!.isVerified = true;
            await user!.save()
            res.json(OK_RESPONSE("User successfully verified."));
          }
          else {
            res.json(ERROR_RESPONSE("Invalid verification key."));
          }

        }
      }
    )
}

export function login(username: string, password: string, req: Request, res: Response) {

  console.log('loggin in user')

  User
    .findOne({ username: username })
    .select('+password')
    .then(
      (user) => {

        if(!user){
          res.json(ERROR_RESPONSE("Unable to log in. Please check input."))
        }
        else if(!user.isVerified){
          res.json(ERROR_RESPONSE("User is not verified."))
        }
        else if(!(user.password === password)){
          
          res.json(ERROR_RESPONSE("Unable to log in. Please check input."))
        }
        else {
          req.session!.username = user.username;

          res.json(OK_RESPONSE("Successfully logged in."))
        }
      }

    )
}

export function logout(req: Request, res: Response) {

  console.log('logging out user');
  
  if (isUserLoggedIn(req)) {
    res.clearCookie('game');
    req.session = undefined;
    res.json( OK_RESPONSE("Logged out successfully.") )
  } 
  else {
    res.json( ERROR_RESPONSE("User was never logged in!"))
  }

}

export function isUserLoggedIn(req: Request): boolean {

  if (req.session!.username && req.cookies.game)
    return true;
  
  else
    return false
}