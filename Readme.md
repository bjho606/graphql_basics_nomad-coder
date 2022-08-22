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

---
## GraphQL is a 'Schema-Definition-Language'(SDL)
## => All GraphQL server should define <b>data types</b> (=schema)
<br>

## 1. Query Type (mandatory!)
    - 'type Query' is the most important and required type in GraphQL Server
    - It is the API that users are going to request
    - 'Query' in GraphQL is like 'GET Request' in Rest API (Get data)

    1) Scalar Type
        GraphQL provides basic scalar types such as String, Int, ID, ...
    
    2) Object Type
        combinations of scalar types can make a new user-made types

## 2. Mutation Type
    - 'type Mutation' is used when user mutates the database (= server state)
    - 'Mutation' in GraphQL is like 'POST/DELETE/PUT/POST Request' in Rest API (modify data)

## ※ Non Nullable Fields
    All fields(=type) are 'nullable' by default
    If you want to make it 'not nullable', add '!' behind the type
    Choose if the fields or arguements are going to be nullable/non-nullable

