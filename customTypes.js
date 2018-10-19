const axios = require('axios');
const graphql = require('graphql');

const {
  GraphQLInt,
  GraphQLObjectType,
  GraphQLString,
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    }
  }
});

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
    },
    company: {
      type: CompanyType,   // Custom type
      resolve: (parentValue, args) => {   // Custom types require resolve functions
        return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`) // Referring to parentValue 
        .then(resp => resp.data);
      }
    }
  }
});

module.exports = {
  Company: CompanyType,
  User: UserType
}