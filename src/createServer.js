// this is our Yoga Server file
const { GraphQLServer } = require('graphql-yoga');
const Mutation = require('./resolvers/Mutation');
const Query = require('./resolvers/Query');
const db = require('./db');

// Create graphQL Yoga Server
function createServer() {
	return new GraphQLServer({
		typeDefs: 'src/schema.graphql',
		resolvers: { Mutation, Query },
		resolverValidationOptions: {
			requireResolversForResolveType: false,
		},
		// request
		context: (req) => ({ ...req, db }),
	});
}

module.exports = createServer;
