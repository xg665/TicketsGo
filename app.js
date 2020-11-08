require('./db');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require("cors");
const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const app = express();

// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: 'secret cookie thang (store this elsewhere!)',
    resave: true,
      saveUninitialized: true
};
app.use(session(sessionOptions));
app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));
// // body parser setup
app.use(bodyParser.json());

app.get('/', (req, res) => {
	
	res.sendFile(path.join(__dirname, 'client/build','index.html'))
  
});

app.get('/category',(req,res)=>{

	
});
app.get('/nearby',(req,res)=>{


});
app.get('/findfavorite',(req,res)=>{

	Item.find({},(err,items)=>{
		
		if(!err){
			res.send(items);
		}

	});

});

app.post('/favorite',(req,res)=>{

	
	const item = new Item({
		item_id: req.body.event_id+" ",
		name : req.body.event_name+" ",
		address : req.body.address+" ",
		category : req.body.category+" ",
		image_url : req.body.image_url+" ",
		url: req.body.url+" "
	});

	item.save(function(err){
		if(!err){
			res.sendStatus(200);
		}
	});

});
app.get('/login', passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' }));



app.listen(process.env.PORT || 3000);
