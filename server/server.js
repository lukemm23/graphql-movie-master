//importing express
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

//importing mongoose and DB connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/movie_master');
mongoose.connection.once('open', ()=> {
    console.log('connected to DB');
});

//importing graphql
const graphqlHTTP = require('express-graphql');

// importing body parser
const bodyParser = require('body-parser');

//importing graphql schema files
const schema = require('./schema/schema');



/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); // needed for angular requests
app.use(express.static('build'));
app.use('/graphql', graphqlHTTP({
    //schema: schema
    schema,
    graphiql: true
}));

/** ---------- START SERVER ---------- **/
app.listen(port, function () {
    console.log('Listening on port: ', port);
});