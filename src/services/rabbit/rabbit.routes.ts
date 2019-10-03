
import { Request, Response } from 'express';
import * as controller from './RabbitController';

export default [
  {
    path: "/listen",
    method: "post",
    handler: async (req: Request, res: Response) => {
      const keys : string[] = req.body.keys;
      let total = 0;
      let message = "";
      console.log('Listening for ' + keys);
      controller.listen(keys, (msg: string) => {
        message += msg;
        total++;
        if(total == keys.length){
          console.log(message);
          res.json({msg: message});
        }
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