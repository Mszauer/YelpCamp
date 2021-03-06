var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    User = require('./models/user'),
    methodOverride = require('method-override'),
    flash = require('connect-flash'),
    seedDB = require('./seeds');
    
var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyBJVkmX6QHwjDQ2BJXGSkbmQ2jyEWl-P8M'
});

//REQUIRING ROUTES
var commentRoutes = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes = require('./routes/index');

var url = process.env.DATABASEURL || 'mongodb://localhost/yelp_camp';
mongoose.connect(url);
    
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// console.log(__dirname+"/public");

//seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once Again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req,res,next){
   res.locals.currentUser =req.user;
   res.locals.error = req.flash('error');
   res.locals.success = req.flash('success');
   next();
});
//test
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
   console.log('Server has started'); 
});