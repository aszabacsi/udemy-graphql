const graphql = require('graphql');
const ramda = require('ramda');

const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} = graphql;

const users = [
  {
    id: '1',
    firstName: 'Sally',
    lastName: 'McSalad',
    age: 25
  },
  {
    id: '2',
    firstName: 'Sam',
    lastName: 'McSalad',
    age: 27
  }, 
]

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLString,
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    }
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: (parentValue, args) => {
        return users.find((user) => args.id === user.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});