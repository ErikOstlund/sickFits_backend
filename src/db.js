// This file connects to remote Prisma DB
// and allows us to query it with JS

const { Prisma } = require('prisma-binding');

// create new db
const db = new Prisma({
	typeDefs: 'src/generated/prisma.graphql',
	endpoint: process.env.PRISMA_ENDPOINT,
	secret: process.env.PRISMA_SECRET,
	// will console log all query and mutations
	debug: false,
});

module.exports = db;
