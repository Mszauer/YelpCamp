var middlewareObj = {};
var Campground = require('../models/campground'),
    Comment = require('../models/comment');
    
middlewareObj.checkCommentOwnership =  function(req,res,next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id,function(err,foundComment){
            //console.log(req.params.id);
           if(err){
               console.log('error: '+err);
               req.flash('error','Something went wrong');
               res.redirect('back');
           } else{
               if(foundComment.author.id.equals(req.user._id)){ //one is object, other is string so === will not work
                   //console.log(foundComment);
                    next();
               } else{
                   req.flash('error','You do not have permission to do that');
                   res.redirect('back');
               }
           }
        });
    } else{
        req.flash('error','You need to be logged in to do that');
        res.redirect('back');
    }
};

middlewareObj.checkCampgroundOwndership = function(req,res,next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id,function(err,foundCampground){
            //console.log(req.params.id);
           if(err){
               console.log('error: '+err);
               req.flash('error','Campground not found');
               res.redirect('back');
           } else{
               if(foundCampground.author.id.equals(req.user._id)){
                   //console.log(foundCampground);
                    next();
               } else{
                   req.flash('error','You do not have permission to do that');
                   res.redirect('back');
               }
           }
        });
    } else{
        req.flash('error','You need to be logged in to do that');
        res.redirect('back');
    }
};

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error','You need to be logged in to do that');
    res.redirect('/login');
};

module.exports = middlewareObj;