import { Request, Response } from "express";
import { TicTacToe } from "./model/TicTacToe";

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

      let json = TicTacToe.updateGameStateFromJson(req.body.grid);
      // console.log(json);
      res
        // .sendStatus(200)
        .send(json);
    }
  },
  {
    path: "/ttt/listgames",
    method: "get",
    handler: async (req: Request, res: Response) => {
      //TODO: List all games played by this user.
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