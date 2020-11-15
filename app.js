require('./db');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require("cors");
const mongoose = require('mongoose');
const Item = mongoose.model('Item');
const User = mongoose.model('User');
const Favorite = mongoose.model('Favorite');
const LocalStrategy = require('passport-local').Strategy
const app = express();


app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());


// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: 'secret cookie thang (store this elsewhere!)',
    resave: true,
      saveUninitialized: true
};
app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({usernameField:'email'}, (email, password, done) => {

	User.findOne({email:email},(err, user)=>{
		
		if(!user){
			
			const newUser = new User({email:email, password:password});

			newUser.save(function(err,user){

				if(!err){
					const favorite = new Favorite({
						user: user._id,
						items: []
					});

					favorite.save(function(err,fav){

						if(!err){
							User.findOneAndUpdate({email: email},{favorites: fav._id},{useFindAndModify:false}, (err,u)=>{

								if(!err){
									
									return done(null,user);
								}
							})
							
						}

					});

					

				}
				else{

					return done(null,false,{message:'error saving!!!'});
				}

			})
		}
		else{
			
			if(user.password===password){

				return done(null,user);
			}
			else{
				return done(null,false,{message:'error saving!!!'});
			}



		}


	});

}));

app.get('/', (req, res) => {
	
	res.sendFile(path.join(__dirname, 'client/build','index.html'))
  
});

app.post('/register',passport.authenticate('local'),(req,res)=>{

	// console.log(req.flash());
	res.send(req.user);

});

app.post('/addPreferences', (req,res)=>{





});

app.get('/getFavs', (req,res)=>{


	if(req.user===undefined){

		res.sendStatus(401);
	}
	else{
		Favorite.findOne({user: req.user._id})
			.populate('items')
	  		.exec(function (err, favorites) {
	    		
	    		if (!err){
					res.send(favorites.items);
	    		}
	    			
	    			
	  		});
  	}

})



app.post('/addfav', (req,res)=>{

	if(!req.user){

		res.sendStatus(401);

	}
	else{

		const user = req.user;

		Item.findOne({item_id:req.body.item_id+""},(err,it)=>{

			if(!err){

				if(it){

					Favorite.findOneAndUpdate({user:user._id}, {"$push": { "items": it._id }},{useFindAndModify:false}, (err,fav)=>{

						if(!err){

							res.sendStatus(200);
						}

					})
				}
				else{

					const item = new Item({
						item_id: req.body.item_id+"",
						name : req.body.name+"",
						address : req.body.address+"",
						lat: req.body.lat+"",
						lon: req.body.lon+"",
						category : req.body.category+"",
						image_url : req.body.image_url+"",
						url: req.body.url+""
					});

					item.save(function(err,item){

						if(!err){

							Favorite.findOneAndUpdate({user:user._id}, {"$push": { "items": item._id }},{useFindAndModify:false}, (err,fav)=>{

								if(!err){

									res.sendStatus(200);
								}

							})

						}
						else{
							console.log(err);
						}

					});


				}

			}

		})

	

	 }
			

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

app.get('/personal',(req,res)=>{

	if(!req.user){
		res.send({email:''});
	}
	else{
		res.send(req.user)
	}
	


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
