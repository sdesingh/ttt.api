import tttRoutes from './ttt/ttt.routes';
import userRoutes from './user/user.routes';

import { Request, Response } from "express";
import path from 'path';

export default [ 
  // {
  //   path: "/hw1.yml",
  //   method: "get",
  //   handler: async (req: Request, res: Response) => {

  //     res.status(200).sendFile(path.join(__dirname, '../../hw1.yml'));
      
  //   }
  // },
  ...userRoutes,
  ...tttRoutes
  
];