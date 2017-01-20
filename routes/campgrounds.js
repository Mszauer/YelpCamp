var express=require('express');
var router = express.Router();
var Campground = require('../models/campground');
var middleware = require('../middleware');
// ==================
// Campgrounds Routes
// ==================
router.get('/',function(req,res){
    Campground.find({},function(err,campgrounds){
       if(err){
           console.log('Error: '+err);
       } else{
           
            res.render('campgrounds/index.ejs',{campgrounds : campgrounds});
       }
    });
});

router.post('/',middleware.isLoggedIn,function(req,res){
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var price = req.body.price;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name: name, image: image, description: desc,price:price, author: author};
    Campground.create(newCampground,function(err,newlyCreated){
        if(err){
            console.log('error: '+err);
        }else{
            res.redirect('/campgrounds');
        }
    });
});

router.get('/new',middleware.isLoggedIn,function(req, res){
    res.render('campgrounds/new.ejs');
});

router.get('/:id',function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log('error: '+ err);
        }else{
            //console.log(foundCampground);
            res.render("campgrounds/show.ejs",{campground: foundCampground});
        }        
    });
    
});
//edit
router.get('/:id/edit',middleware.checkCampgroundOwndership,function(req, res) {
    Campground.findById(req.params.id,function(err,foundCampground){
            res.render('campgrounds/edit.ejs',{campground: foundCampground});
    });
});

router.put('/:id',middleware.checkCampgroundOwndership,function(req,res){
   Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
       if(err){
           console.log('error: '+err);
           res.redirect('/campgrounds');
       }else{
           res.redirect('/campgrounds/'+req.params.id);
       }
   });
});

router.delete('/:id',middleware.checkCampgroundOwndership,function(req,res){
   Campground.findByIdAndRemove(req.params.id,function(err){
       if(err){
           res.redirect('/campgrounds');
       }else{
           res.redirect('/campgrounds');
       }
   });
});

module.exports = router;