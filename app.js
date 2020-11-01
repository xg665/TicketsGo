//require('./db');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport')
const app = express();

// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: 'secret cookie thang (store this elsewhere!)',
    resave: true,
      saveUninitialized: true
};
app.use(session(sessionOptions));

// // body parser setup
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  
});

app.get('/category',(req,res)=>{


});
app.get('/nearby',(req,res)=>{


});
app.get('/favorite',(req,res)=>{


});
app.get('/login', passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' });



app.listen(5000);
