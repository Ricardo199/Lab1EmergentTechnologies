import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient('http://localhost:5000/graphql');

export default client;
