require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./schemas/user');
const Book = require('./schemas/book');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')

const app = express();
const id = uuidv4();
const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.g3am7ow.mongodb.net/?retryWrites=true&w=majority`
app.use(cookieParser());
app.use(cors());


const port = process.env.PORT || 3000; 
app.listen(port,()=>{
    mongoose.connect(url)
    .then(()=>{
    console.log("connected to the database");
    console.log("server running on port 3000");
    }).catch((err)=>{
        console.log(err);
    })
})


app.post("/save-user",(req,res)=>{
    const user = new User({
        name : req.query.name,
        email : req.query.email
    })
    user.save()
    .then(()=>{
        res.status(200).json({
            "id" : id,
        })
    }).catch((err)=>{
        console.log(err);
    })
})

app.post("/check-user",(req,res)=>{
    const user = new User({
        name : req.query.name,
        email : req.query.email,
    })
    User.findOne(user).then((item)=>{
        if (item) {
            res.status.json("user founded in database")
        } else {
            res.status(200).json("user not found");
        }
    }).catch((err)=>{
        console.log(err);
    })
})

app.get("/fetch-users",(req,res)=>{
    User.find().then((item)=>{
        res.status(200).json(item)
    }).catch((err)=>{
        console.log(err);
    })
})


app.post("/add-book",(req,res)=>{
    const book = new Book({
        title : req.query.title,
        author : req.query.author,
        publishedAt : req.query.publishedAt,
    })
        book.save()
        .then(()=>{
            res.status(200).json("book added");
        }).catch((err)=>{
            console.log(err);
        })
    
})

app.post("/delete-book",(req,res)=>{
    const book = new Book({
        title : req.query.title,
        author : req.query.author,
        publishedAt : req.query.publishedAt
    })
        Book.findOneAndDelete(book).then((item)=>{
            if (item) {
                res.status(200).json("book deleted");
            } else {
                res.status(200).json("book not deleted");
            }
        }).catch((err)=>{
            console.log(err);
        })
})

app.get("/fetch-books",(req,res)=>{
    Book.find().then((item)=>{
        res.status(200).json(item)
    }).catch((err)=>{
        console.log(err);
    })
})