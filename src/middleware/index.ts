import {
	handleCors,
	handleBodyRequestParsing,
	handleCompression,
	handleCookies,
	handleCookieParsing,
} from './common';

export default [handleCompression, handleCors, handleBodyRequestParsing, handleCookies, handleCookieParsing]