const express = require("express");
const app = express();

app.set("view engine", "ejs")

app.get("/", (req, res)=>{
    res.render("landing", {title: "Home"});
});

app.get("/campgrounds", (req, res)=>{
    let campgrounds = [
        {name: "Cherry Hill Park", image: "https://farm3.staticflickr.com/2464/3694344957_14180103ed.jpg"},
        {name: "Live Oak Landing", image: "https://farm5.staticflickr.com/4083/4961648022_7fec214b35.jpg"},
        {name: "Myers Lake", image: "https://farm2.staticflickr.com/1424/1430198323_c26451b047.jpg"}
    ]
    res.render("campgrounds", {campgrounds: campgrounds, title: "Campgrounds"});
});

app.listen(process.env.PORT, process.env.IP, ()=>{
    console.log("The YelpCamp server has started");
})