// [2 ways to import]
// 1. module way (must add "type":"module" on package.json)
import { ApolloServer, gql } from "apollo-server";
// 2. normal way
// const { ApolloServer, gql } = require("apollo-server");

let tweets = [
    {
        id: "1",
        text: "first hello",
    },
    {
        id: "2",
        text: "second hello",
    },
];

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
        author: User
    }

    type Query {
        allTweets: [Tweet!]!
        tweet(id: ID!): Tweet
        ping: String!
    }

    type Mutation {
        postTweet(text: String!, userId: ID!): Tweet!
        deleteTweet(id: ID!): Boolean!
    }
`;

// when a user requests a field in query type, apollo server will go to 'resolvers' and find the 'function' that has the same name with query type and call the function
const resolvers = {
    Query: {
        // tweet(){
        //     console.log("I'm called");
        //     return null;
        // },
        // ping() {
        //     return "pong";
        // },

        allTweets(){
            return tweets;
        },
        
        // user-input-arguements are 'ALWAYS' going to be in the second arguement in the resolver function
        // tweet(root, args){
        //     console.log(args);
        //     return null;
        // },
        tweet(root, {id}){
            return tweets.find(tweet => tweet.id === id);
        }
    },

    Mutation: {
        postTweet(_, { text, userId }){
            const newTweet = {
                id: tweets.length + 1,
                text,
            };
            tweets.push(newTweet);
            return newTweet;
        },
        deleteTweet(_, { id }){
            const tweet = tweets.find(tweet => tweet.id === id);
            if(!tweet) return false;
            tweets = tweets.filter(tweet => tweet.id !== id);
            return true;
        },
    },
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`);
});