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
      controller.getUser(req.body.email, res);
    }
  },
  {
    path: "/logout",
    method: "post",
    handler: async (req: Request, res: Response) => {
      //TODO: Logout user.
    }
  },


]