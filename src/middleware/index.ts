import {
	handleCors,
	handleBodyRequestParsing,
	handleCompression,
	handleCookies,
	handleCookieParsing,
  handleSPARouting,
} from './common';

export default [handleCompression, handleCors, handleBodyRequestParsing, handleCookies, handleCookieParsing]