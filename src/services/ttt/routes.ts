import { Request, Response } from "express";
import { TicTacToe } from "./model/TicTacToe";
import path from "path";

export default [
  {
    path: "/",
    method: "get",
    handler: async (req: Request, res: Response) => {
      res.render("pages/index.ejs", { user: null, date: null});
    }
  },
  {
    path: "/",
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
    path: "/play",
    method: "post",
    handler: async (req: Request, res: Response) => {

      let json = TicTacToe.getWinnerFromJson(req.body.grid);

      res
        // .sendStatus(200)
        .send(json);
    }
  },


]