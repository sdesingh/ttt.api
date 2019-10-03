import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import routes from "./services";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import mongoose from 'mongoose';

import keys from './config/keys.json';
import path from 'path';
import { initializeRabbitConnection } from "./services/rabbit/RabbitController";


process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
});

process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
})

export let channel = null;

const router = express();


// Initialize Mongoose.
mongoose
  .connect
  (
      keys.db_hostname,
      { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: keys.db_username,
        pass: keys.db_password,
      }
  )
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch(err => console.log(err));

initializeRabbitConnection();



router.use(express.static(path.join(__dirname, 'services/client')));
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);




const { PORT = 3000} = process.env;
const server = http.createServer(router);


server.listen(PORT, () => 
    console.log(`Server is running on PORT:${PORT}...`)
);