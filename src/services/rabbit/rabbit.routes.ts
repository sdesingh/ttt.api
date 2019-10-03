
import { Request, Response } from 'express';
import * as controller from './RabbitController';

export default [
  {
    path: "/listen",
    method: "post",
    handler: async (req: Request, res: Response) => {
      const keys : string[] = req.body.keys;
      controller.listen(keys, (msg: string) => {
        res.json({msg: msg});
      });
    },
  },
  {
    path: "/speak",
    method: "post",
    handler: async (req: Request, res: Response) => {
      const key = req.body.key;
      const msg = req.body.msg;
      controller.speak(key, msg);
      res.json({message: 'Message sent successfully.'});
    }
  }
]