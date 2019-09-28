import User, { IUser } from './model/User';
import { Response } from 'express';



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
        res.send("User created successfully. Check verification email.");

        // TODO: Send verification email.
      }
      
  });
}

export function getUser(userEmail: string, res: Response) {

  User.findOne(

    { email: userEmail }, 

    (err, user: IUser) => {

      if(err || !user) 
        res.json({error: "Not found..."});
  
      else 
        res.json(user);
      
    }
  )

}