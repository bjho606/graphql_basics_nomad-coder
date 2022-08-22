// [2 ways to import]
// 1. module way (must add "type":"module" on package.json)
import { ApolloServer, gql } from "apollo-server";
// 2. normal way
// const { ApolloServer, gql } = require("apollo-server");

// must explain the 'shape(type) of data'(=schema definition language) to graphql
// 'typeDef' is making a gql structure
// !![IMPORTANT] the 'type Query' is MANDATORY! (You must define it!)
const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        firstname: String!
        lastname: String
    }

    type Tweet {
        id: ID!
        text: String!
        author: User!
    }

    type Query {
        allTweets: [Tweet!]!
        tweet(id: ID!): Tweet
    }

    type Mutation {
        postTweet(text: String!, userId: ID!): Tweet!
        deleteTweet(id: ID!): Boolean!
    }
`;

const server = new ApolloServer({typeDefs});

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`);
});