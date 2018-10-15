const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema.js');

const app = express();

app.use('/api', expressGraphQL({
  graphiql: true,
  schema
}));

app.listen(4000);