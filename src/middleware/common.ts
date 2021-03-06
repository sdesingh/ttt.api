import { Router } from "express";
import cors from "cors";
import parser from "body-parser";
import compression from "compression";
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import history from 'connect-history-api-fallback';

export const handleCors = (router: Router) => 
	router.use(cors({credentials: true, origin: true}));

export const handleBodyRequestParsing = (router: Router) => {
	router.use(parser.urlencoded({extended: true}));
	router.use(parser.json());
};

export const handleCookieParsing = (router: Router) => {
	router.use(cookieParser());
}

export const handleCompression = (router: Router) => {
	router.use(compression());
};

export const handleSPARouting = (router: Router) => {
  router.use(history({  index: '/dist/services/client/index.html' }));
}

export const handleCookies = (router: Router) => {
	router.use(cookieSession({
		name: 'game',
		secret: "lololol",
	}));
};