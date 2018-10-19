const graphql = require('graphql');
const axios = require('axios');
const types = require('./customTypes')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: types.User,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: (parentValue, args) => {
        return axios.get(`http://localhost:3000/users/${args.id}`)
        .then(resp => resp.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});