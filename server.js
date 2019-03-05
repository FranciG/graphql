//Very simple express server

const express = require ('express');
//Create an app variable initialazing express
const expressGraphQL = require('express-graphql');
const schema = require('./main.js');

const app = express();
//Clients will go trough that route
app.use('/graphql', expressGraphQL({
    schema:schema, //create a different configuration file with the schema
    graphiql:true
})); 
//to run our server
app.listen(4000,()=>{
    console.log('server is running');
});
//Everytime an outside resource 

