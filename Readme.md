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
All GraphQL server should define <b>data types</b> (=schema)<br>
## 1. Query Type
'Query' in GraphQL is like 'GET Request' in Rest API

### Scalar Type
GraphQL provides basic scalar types such as String, Int, ID, ...

### Object Type
combinations of scalar types can make a new user-made types

## 2. Mutation Type
'Mutation' in GraphQL is like 'POST Request' in Rest API