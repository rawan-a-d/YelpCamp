const express = require("express"),
      app = express(),
      bodyParser = require("body-parser"),
      mongoose = require("mongoose");

app.set("view engine", "ejs");
app.set('views', __dirname + '/src/views');

app.use("/", bodyParser());
app.use(express.static('src/public'));

mongoose.connect("mongodb://localhost/yelp_camp", {useMongoClient: true});

/* Schema SETUP */
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
});

/* Compile into a model */
let Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create(
        {
            name: "Live Oak Landing",
            image: "https://farm5.staticflickr.com/4083/4961648022_7fec214b35.jpg"
        }, (err, campground)=>{
        if(err){
            console.log(err);
        }
        else {
            console.log("Newly created campground: ")
            console.log(campground);
        }
    }
);*/
    
                                    /* Landing page */
app.get("/", (req, res)=>{
    res.render("landing", {title: "Home"});
});

                                    /* Display campgrounds route */
app.get("/campgrounds", (req, res)=>{
    // Get all campgrounds from DB
    Campground.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        }
        else {
            res.render("campgrounds", {campgrounds: campgrounds, title: "Campgrounds"});
        }
    });

});

                                    /* Make a new campground route */
app.post("/campgrounds", (req, res)=>{
    // Get data from the form
    let name = req.body.name;
    let image = req.body.image;
    
    var campground = {
        name: name, 
        image: image
    };
    // Create new campground and save to DB
    Campground.create(campground, function(err, campground){
        if(err) {
            console.log(err);
        }
        else {
            console.log(campground);
            // Redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

                                    /* Show the form to add new campgrounds route */
app.get("/campgrounds/new", (req, res)=>{
    res.render("new", {title: "Add campgrounds"});
});

                                    /* The server */
app.listen(process.env.PORT, process.env.IP, ()=>{
    console.log("The YelpCamp server has started");
})