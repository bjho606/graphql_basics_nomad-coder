// [2 ways to import]
// 1. module way (must add "type":"module" on package.json)
import { ApolloServer, gql } from "apollo-server";
// 2. normal way
// const { ApolloServer, gql } = require("apollo-server");
import fetch from "node-fetch";

let tweets = [
    {
        id: "1",
        text: "first hello",
        userId: "2",
    },
    {
        id: "2",
        text: "second hello",
        userId: "1",
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
        """
        You can write descriptions on fields too!
        """
        fullName: String!
    }

    """
    You can write descriptions like this. It will automatically show this in the API docs
    """
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

        allMovies: [Movie!]!
        movie(id: String!): Movie
    }

    type Mutation {
        postTweet(text: String!, userId: ID!): Tweet
        """
        Deletes a Tweet if found, else returns false
        """
        deleteTweet(id: ID!): Boolean!
    }

    type Movie {
        id: Int!
        url: String!
        imdb_code: String!
        title: String!
        title_english: String!
        title_long: String!
        slug: String!
        year: Int!
        rating: Float!
        runtime: Float!
        genres: [String]!
        summary: String
        description_full: String!
        synopsis: String
        yt_trailer_code: String!
        language: String!
        background_image: String!
        background_image_original: String!
        small_cover_image: String!
        medium_cover_image: String!
        large_cover_image: String!
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
        },

        allMovies(){
            return fetch("https://yts.mx/api/v2/list_movies.json")
            .then(res=>res.json())
            .then(json => json.data.movies);
        },

        movie(_, { id }){
            return fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
            .then(res=>res.json())
            .then(json => json.data.movie);
        },
    },

    Mutation: {
        postTweet(_, { text, userId }){
            const findUser = users.find((user) => user.id === userId);
            if(!findUser) return null;

            const newTweet = {
                id: tweets.length + 1,
                text,
                userId,
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
            return `${firstName} ${lastName}`;
        },
    },

    Tweet: {
        author({ userId }){
            return users.find(user => user.id === userId);
        },
    },
};

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({ url }) => {
    console.log(`Running on ${url}`);
});