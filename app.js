//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent ="Welcome to REMARKABLE BLOGs!  What is Blogging?  Blogging is the process of writing online journals and contents in which you can share your thoughts with people around the world.  First blog was created in the year 1994 by Justin Hall to publish his writing.  Early blogs focused mainly on technical subjects. In the year 1998 creation of OPEN DIARY, a blogging platform made a revolution allowing regular people to write their own blogs.  Blogging continued to grow in the early 21st century.  There are millions of blogs live today.  Blogs are becoming the major source of marketing " ;
const aboutContent = "Welcome to REMARKABLE BLOGs!  The first step in blogging is not writing them but reading and enjoying them.  Hope you'll find useful blogs.  Blogging is a great way to express your ideas and talents to this world. In REMARKABLE BLOGS you can compose your own blogs and publish them.  Make sure to give a suitable title in Title field. And type your content in Post field. Hit Publish button to publish your writing to the whole world.  Have a great journey!";
const contactContent = "To contact: redhummingbirda1@gmail.com.   This website does not share personal information nor use store information about your visit.  Enjoy reading and sharing your ideas.  Any views or opinions represented in this website are not intended to affect other's feeling ";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Sakthi69:19june1975@sakthi.lind3.mongodb.net/blogDB", {useNewUrlParser: true});
const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    if(!err){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
    
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

let port=process.env.PORT;
if(port==null||port==""){
  port=3000;
}

app.listen(port, function() {
  console.log("Server started successfully");
});
