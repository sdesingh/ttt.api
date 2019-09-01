import { Request, Response } from "express";
import { TicTacToe } from "./model/TicTacToe";

export default [
  {
    path: "/ttt",
    method: "get",
    handler: async (req: Request, res: Response) => {
      res.send("Hi!");
    }
  },
  {
    path: "/ttt/play",
    method: "post",
    handler: async (req: Request, res: Response) => {

      let json = TicTacToe.getWinnerFromJson(req.body.grid);

      res
        // .sendStatus(200)
        .send(json);
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
        .send(`Hi ${name}, ${date.toString()}`)
    }
  },

]