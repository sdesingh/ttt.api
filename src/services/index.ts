import searchRoutes from './search/routes';
import tttRoutes from './ttt/routes';
import { Request, Response } from "express";
import path from 'path';

export default [ 
  {
    path: "/hw1.yml",
    method: "get",
    handler: async (req: Request, res: Response) => {

      res.status(200).sendFile(path.join(__dirname, '../../hw1.yml'));
      
    }
  },
  ...tttRoutes
  
];