const express = require('express');
const expressGraphQL = require('express-graphql');

const app = express();

app.use('/api', expressGraphQL({
  graphiql: true
}));

app.listen(4000);