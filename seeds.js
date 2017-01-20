var mongoose = require('mongoose'),
    Campground = require('./models/campground'),
    Comment = require('./models/comment');
    
var lorem = "*This is a seeded campground*Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
var data = [
    {
        name:"Cloud's Rest", 
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Gordale_camping_site.JPG/800px-Gordale_camping_site.JPG",
        description: lorem
    },
    {
        name:"Desert Mesa", 
        image:"https://cbshartford.files.wordpress.com/2011/07/best-camping-site-in.jpg?w=420",
        description: lorem
    },
    {
        name:"Canyon Floor", 
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR16SKx5Hs1XfIr9UBawkv_dn31iPDLJx_Fn6rXBq_kWbeLO-3e",
        description: lorem
    }
];
function seedDB(){
    //remove all campgrounds
        Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("Removed Campgrounds");
        /*
        //add a few campgrounds
        data.forEach(seed => {
            Campground.create(seed,function(err,campground){
                if(err){
                    console.log('Error: '+err);
                }else{
                    console.log("added a campground");
                    //create comments on campground
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet *seeded comment*",
                            author: "Homer"
                        },function(err,comment){
                            if(err){
                                console.log('Error' + err);
                            }else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log('created new comment');
                            }
                        });
                }//end else of create
            });//end create
        });//end forEach*/
    });//end remove
}

module.exports = seedDB;