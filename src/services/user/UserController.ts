import User from './model/User';
import { Request, Response } from 'express';



export function addUser(document: any, res: Response) {

  // Clean up user fields provided by client.
  delete document.isVerified
  delete document.verificationKey

  const user = new User(document);

  user.save(
    
    (err, user) => {

      if(err)
      {
        res.json({user: "Unable to create user."});
      }    
      else 
      {
        res.json( {status: "OK", message: "User created sucessfully."} );

        // TODO: Send verification email.
      }
      
  });
}

export function login(username: string, password: string, req: Request, res: Response) {


  User.findOne({ username: username })
    .select('+password')
    .then(
      (user) => {

        if(!user){
          res.json( {status: "ERROR", message: "Can't find user." } )
        }
        else if(!(user.password === password)){
          
          res.json( {status: "ERROR", message: "Incorrect password."} )
        }
        else {
          req.session!.username = user.username;
          res.json( {status: "OK", message: "Successfully logged in."} )
        }
      }

    )
}

export function logout(req: Request, res: Response) {
  
  if (req.session!.username && req.cookies.game) {
    res.clearCookie('game');
    res.json( {status: "OK", message: "Logged out successfully."} )
  } 
  else {
    res.json( {status: "ERROR", message: "User was never logged in."})
  }

}