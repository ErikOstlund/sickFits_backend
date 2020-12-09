// this file boots up the server!
const cookieParser = require('cookie-parser');
require('dotenv').config({ path: 'variables.env' });
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// express middleware to access cookies(JWT)
server.express.use(cookieParser());
// TODO: use express middleware to populate current user

server.start(
	{
		// ensures the endpoint is only accessible from our (approved) url
		cors: {
			credentials: true,
			origin: process.env.FRONTEND_URL
		}
	},
	(deets) => {
		console.log(`Server now running on port http:/localhost:${deets.port}`);
	}
);
