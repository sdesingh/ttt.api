import {Request, Response } from 'express';

export default [
  {
    path: "/adduser",
    method: "post",
    handler: async (req: Request, res: Response) => {
      //TODO: Add a disabled user.
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
      //TODO: Login user.
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