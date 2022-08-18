// [2 ways to import]
// 1. module way (must add "type":"module" on package.json)
import { ApolloServer, gql } from "apollo-server";
// 2. normal way
// const { ApolloServer, gql } = require("apollo-server");

// must explain the 'shape(type) of data'(=schema definition language) to graphql
// !![IMPORTANT] the 'type Query' is MANDATORY! (You must define it first!)
// -> it is like making 'GET /url` in rest API
const typeDefs = gql`
    type Query {
        text: String
    }
`;

const server = new ApolloServer({typeDefs});

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`);
});