// 1ST DRAFT DATA MODEL
const mongoose = require('mongoose');

// users
// * authenticated by passport.js
// * each user needs to have email to register
// * each user have own favorites events
const User = new mongoose.Schema({
  //username provided by passport
  //password hash provided by passport
  email:{type: String, required: true, unique:true},
  favorites: {type: mongoose.Schema.Types.ObjectId, ref: 'Favorite'}
});

// an item from a favorite list
// * needs to have a unique id
// * name
const Item = new mongoose.Schema({
  item_id: {type: String, required: true, unique:true},
  name: {type: String, required: true},
  address: {type: String,required: true},
  category:{type: String,required:true},
  image_url:{type:String,required:true},
  url:{type: String, required:true}
});

// a favorite list
// * each list must have a related user
// * items include zero or more Item
const Favorite = new mongoose.Schema({
  user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
  items: [{type: mongoose.Schema.Types.ObjectId, ref:'Item'}]
});

// TODO: add remainder of setup for slugs, connection, registering models, etc. below

mongoose.model('User', User);
mongoose.model('Item', Item);
mongoose.model('Favorite', Favorite);

let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
// if we're in PRODUCTION mode, then read the configration from a file
// use blocking file io to do this...
  const fs = require('fs');
  const path = require('path');
  const fn = path.join(__dirname, '../config.json');
  const data = fs.readFileSync(fn);

// our configuration file will be in json, so parse it and set the
// conenction string appropriately!
  const conf = JSON.parse(data);
  dbconf = conf.dbconf;
} else {
// if we're not in PRODUCTION mode, then use
  //dbconf = 'mongodb://localhost/hw05';
}

mongoose.connect(dbconf);