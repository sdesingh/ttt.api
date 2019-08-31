import { Request, Response } from "express";

export default [
  {
    path: "/ttt",
    method: "get",
    handler: async (req: Request, res: Response) => {
      res.send("Hi!");
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
  }
]