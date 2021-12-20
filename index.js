const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

var mongo = require('mongodb').MongoClient;
//Import models
const Post = require('./src/models/post');

//Defining the application
const app= express()

//define the db conn
const db = mongoose.connect('mongodb://localhost:27017/first-node-api-db')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/', function(req, res){

    //handling the request when someone viits the page
    res.send({ping:"pong"})
})

//we can perform 4 operations. Create, Read, Update, Delete (CRUD or CURD)

//creating
app.post('/posts', function(req, res){
    //get values from the req payload
    const title = req.body.title
    const author = req.body.author
    const content = req.body.content
    
    //creating a new post
    //asign values to post model
    var post = new Post();
    post.title  = title
    post.author  = author
    post.content = content
    
    //gives access to the error if any and allows to send a new post id if success
    post.save(function(error, savedPost){
        if(error){
            //send error response
            res.status(500).send({error:'Unable to save post'})
        }

        else{
            res.status(200).send(savedPost)
        }
    }) //to save 


    // res.send({title: title, author: author, content: content})
});

//gettting the details of the single post using array index.
app.get('/posts', function(req,res){
    Post.find({},function(error, posts){
        if(error){
            //send error response
            res.status(422).send({error:'Unable to fetch post'})
        }

        else{
            res.status(200).send(posts[0])
        }
    })
})

//updating using the put req
// app.put('/:id', (req,res,next)=>{
//     console.log(req.params.id);
// })

app.patch("/:id", function update(req, res){
    const id = "61c00f573dc7307ca920317f";
    var post = new Post();
    
    const updatedPost = {
         title: req.body.title,
     author :req.body.author,
     content: req.body.conten,t
    }
    mongoose.models.Post.updateOne(updatedPost, {where: {id:id}}).then(result=> {
        res.status(200).json({
            "message":"post is updated",
            post:updatedPost
        });
    }).catch(error=>{
        res.status(500).json({
            message:"something is wrong",
            error:error
        });
    })
})

app.listen(3001, function() {
    console.log('server is running at the port 3001')
})


