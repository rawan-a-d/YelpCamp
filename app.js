const express = require("express");
const app = express();
const bodyParser = require("body-parser")

app.set("view engine", "ejs");
app.use("/", bodyParser())

let campgrounds = [
    {name: "Cherry Hill Park", image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"},
    {name: "Live Oak Landing", image: "https://farm5.staticflickr.com/4083/4961648022_7fec214b35.jpg"},
    {name: "Myers Lake", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"}
];
    
                                    /* Landing page */
app.get("/", (req, res)=>{
    res.render("landing", {title: "Home"});
});

                                    /* Display campgrounds route */
app.get("/campgrounds", (req, res)=>{
    res.render("campgrounds", {campgrounds: campgrounds, title: "Campgrounds"});
});

                                    /* Make a new campground route */
app.post("/campgrounds", (req, res)=>{
    // Get data from form and add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    var campground = {
        name: name, image: image
    };
    campgrounds.push(campground);
    // Redirect back to campgrounds page
    res.redirect("/campgrounds");
});

                                    /* Show the form to add new campgrounds route */
app.get("/campgrounds/new", (req, res)=>{
    res.render("new", {title: "Add campgrounds"});
});

                                    /* The server */
app.listen(process.env.PORT, process.env.IP, ()=>{
    console.log("The YelpCamp server has started");
})