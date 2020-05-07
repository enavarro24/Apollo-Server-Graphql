const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { loadTypeSchema } = require('./utils/schema');
const app = express();
const port = process.env.PORT || 3000; 
const bodyParser = require("body-parser");
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config')[env];
const user = require('./services/user/user.resolvers');
const _ = require('lodash');

const types = [
  { type: 'user', block: '/services' },
];


const start = async () => {
  const rootSchema = `
  schema {
    query: Query
    mutation: Mutation
  }`;

  const schemaTypes = await Promise.all(types.map(loadTypeSchema));
  const resolvers = {};

    _.merge(
      resolvers, user);

    if(env === 'development' ) {
      _.merge(resolvers, user);
    }


  const server = new ApolloServer({
    typeDefs: [rootSchema, ...schemaTypes],
    resolvers : resolvers
  });

  app.use(bodyParser.json({ limit: '100mb' }));

  server.applyMiddleware({ app, path: '/graphql' });
  
  await app.listen(port);

  console.log(`Apollo Server ready at localhost:${port}/graphql`);
};

module.exports = { start };