const { GraphQLServer } = require("graphql-yoga");
const { makeExecutableSchema } = require("graphql-tools");
const { importSchema } = require("graphql-import");
const typeDefs = importSchema("./schema.graphql");
const resolvers = require("./resolvers");
const mongoose = require('mongoose');
const { DB_URI } = require('./config');

mongoose.connect(DB_URI, { useNewUrlParser: true });
const mongo = mongoose.connection;
mongo.on("error", (error) => console.log(error)).once("open", () => console.log("Database connected succesfully"));

// Graphql Configuration
const schema = makeExecutableSchema({
	typeDefs,
	resolvers,
});

const server = new GraphQLServer({
	schema,
	context: req => ({...req})
});

const options = {
	port: process.env.PORT || 8000,
	endpoint: "/graphql",
	playground: "/playground",
	cors:{
		origin:"*"
	}
};

// Server
server.start(options,
	({ port }) => console.log(`Server listening on Port ${port}`));

module.exports = { schema };