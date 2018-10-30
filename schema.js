const graphql = require('graphql');
const axios = require('axios');
const types = require('./types');

const {
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
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
    },
    company: {
      type: types.Company,
      args: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve: (parentValue, args) => {
        return axios.get(`http://localhost:3000/companies/${args.id}`)
        .then(resp => resp.data);
      }
    },
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    addUser: {
      type: types.User,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyId: { type: GraphQLString }
      },
      resolve: (parentValue, { firstName, lastName, age, companyId }) => {
        return axios.post(`http://localhost:3000/users/`, {
          firstName, lastName, age, companyId
        })
        .then(resp => resp.data);
      }
    },
    deleteUser: {
      type: types.User,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: (parentValue, { id }) => {
        return axios.delete(`http://localhost:3000/users/${id}`)
        .then(resp => resp.data);
      }
    },
    addCompany: {
      type: types.Company,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve: (parentValue, { name, description }) => {
        return axios.post(`http://localhost:3000/companies/`, { name, description })
        .then(resp => resp.data);
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
});