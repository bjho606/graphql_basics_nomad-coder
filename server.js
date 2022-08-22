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

let users = [
    {
        id: "1",
        firstName: "nico",
        lastName: "ssam",
    },
    {
        id: "2",
        firstName: "elon",
        lastName: "mask",
    },
];

// must explain the 'shape(type) of data'(=schema definition language) to graphql
// 'typeDef' is making a gql structure
// !![IMPORTANT] the 'type Query' is MANDATORY! (You must define it!)
const typeDefs = gql`
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        fullName: String!
    }

    type Tweet {
        id: ID!
        text: String!
        author: User
    }

    type Query {
        allUsers: [User!]!
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
        },

        allUsers(){
            console.log("allUsers called");
            return users;
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

    User: {
        // [field(type) resolver]
        // -> if user requires a field that is not on the 'data', gql will look for it on the 'resolver'
        // -> and if there is a field resolver, it will call it
        
        // fullName(){
        // fullName(root){
        fullName({ firstName, lastName }){
            console.log("fullName called");
            // console.log(root);
            console.log(`${firstName} ${lastName}`);
            return "hello";
        }
    }
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`);
});