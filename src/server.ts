import http from "http";
import express from "express";
import { applyMiddleware, applyRoutes } from "./utils";
import routes from "./services";
import middleware from "./middleware";
import errorHandlers from "./middleware/errorHandlers";
import path from 'path';

process.on("uncaughtException", e => {
	console.log(e);
	process.exit(1);
});

process.on("unhandledRejection", e => {
	console.log(e);
	process.exit(1);
})

const router = express();
router.set("views", path.join(__dirname, "../views"));
router.use(express.static(path.join(__dirname, "../views/css")));
router.set("view engine", "ejs");
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const { PORT = 3000} = process.env;
const server = http.createServer(router);


server.listen(PORT, () => 
	console.log(`Server is running http://localhost:${PORT}...`)
);