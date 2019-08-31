import {
	handleCors,
	handleBodyRequestParsing,
	handleCompression
} from './common';

export default [handleCompression, handleCors, handleBodyRequestParsing]