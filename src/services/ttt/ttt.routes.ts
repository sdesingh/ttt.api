import { Request, Response } from "express";
import * as controller from './TTTController';

export default [
  {
    path: "/ttt",
    method: "get",
    handler: async (req: Request, res: Response) => {
      res.render("pages/index.ejs", { user: null, date: null});
    }
  },
  {
    path: "/ttt",
    method: "post",
    handler: async (req: Request, res: Response) => {

      let name : string = req.body.name;
      let date : Date = new Date(Date.now());

      res
        .status(200)
        .render("pages/index", {
          user: name,
          date: date
        })
    }
  },
  {
    path: "/ttt/play",
    method: "post",
    handler: async (req: Request, res: Response) => {

  
    }
  },
  {
    path: "/ttt/listgames",
    method: "get",
    handler: async (req: Request, res: Response) => {
      controller.listGames(res);
    }
  },
  {
    path: "/ttt/getgame",
    method: "get",
    handler: async (req: Request, res: Response) => {
      //TODO: List all games played by this user.
    }
  },
  {
    path: "/ttt/getscore",
    method: "get",
    handler: async (req: Request, res: Response) => {
      //TODO: List all games played by this user.
    }
  }
]