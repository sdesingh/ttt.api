import { Request, Response } from 'express';
import * as controller from './UserController';

export default [
  {
    path: "/adduser",
    method: "post",
    handler: async (req: Request, res: Response) => {

      controller.addUser(req.body, res);

    }
  },
  {
    path: "/verify",
    method: "post",
    handler: async (req: Request, res: Response) => {
      //TODO: Verify user with the given key.
    }
  },
  {
    path: "/login",
    method: "post",
    handler: async (req: Request, res: Response) => {
      const username = req.body.username;
      const password = req.body.password;

      controller.login(username, password, req, res);
    }
  },
  {
    path: "/logout",
    method: "post",
    handler: async (req: Request, res: Response) => {
      //TODO: Logout user.
      controller.logout(req, res);
    }
  },


]