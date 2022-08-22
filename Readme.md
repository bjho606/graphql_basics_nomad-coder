Basics and concept of GraphQL

# How to run
> npm run dev

<br>

# Setup
1. `> npm init -y`
2. `> npm i apollo-server graphql`
3. `> npm i nodemon -D`
4. on package.json, change "test":... -> "dev":"nodemon server.js"
4. on package.json, add "type":"module"
5. make file '.gitignore', 'server.js'
6. `> git init`

<br>

# GraphQL
GraphQL is a 'Schema-Definition-Language'(SDL)<br>
<br>

## 1. Types
All GraphQL server should 'define' <b>data types</b> (=schema)
### 1) Query Type (mandatory!)
    - 'type Query' is the most important and required type in GraphQL Server
    - It is the API that users are going to request
    - 'Query' in GraphQL is like 'GET Request' in Rest API (Get data)

    1. Scalar Type
        GraphQL provides basic scalar types such as String, Int, ID, ...
    
    2. Object Type
        combinations of scalar types can make a new user-made types

### 2) Mutation Type
    - 'type Mutation' is used when user mutates the database (= server state)
    - 'Mutation' in GraphQL is like 'POST/DELETE/PUT/POST Request' in Rest API (modify data)

### ※ Non Nullable Fields
    All fields(=type) are 'nullable' by default
    If you want to make it 'not nullable', add '!' behind the type
    Choose if the fields or arguements are going to be nullable/non-nullable

## 2. Resolvers
Resolver is how the types(that are defined) should work
=> Making a function for the types

    'Resolver functions' must have the same name as 'Types',
    'Arguements' (that is sent from user) are going to be in the 'SECOND' position(arguement) of the resolver function
        -> the first arguement is 'the root arguement'

    We can also make 'field resolvers' (not only 'type resolver')
        -> If a user requires a field that is not on the database, gql will look for it on the resolver(by root arguement), and if there is a field resolver, it will call it

## Documentation
GraphQL has a built-in documentation function!
All you have to do is write documents between `""" """`

<br>

---
## Migrating REST to GraphQL
1. Make schema(type, resolver) of the REST API for GraphQL API
2. request in gql