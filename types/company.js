const axios = require('axios');
const graphql = require('graphql');

const UserType = require('./user');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields
});

module.exports = CompanyType;

const fields = () => ({
  id: {
    type: GraphQLString
  },
  name: {
    type: GraphQLString
  },
  description: {
    type: GraphQLString
  },
  users: {
    type: new GraphQLList(UserType),
    resolve: (parentValue, args) => {   // Custom types require resolve functions
      return axios.get(`http://localhost:3000/companies/${parentValue.companyId}/users`) // Referring to parentValue 
      .then(resp => resp.data);
    } 
  }
})