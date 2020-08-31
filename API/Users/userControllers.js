const express = require("express");
const app = express();
const bodyPaser = require("body-parser");
const jwt = require ('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 15;

const { post } = require("./userRoutes");

app.use(bodyPaser.json());
// app.use(express.json());


const adminUsers = [
    {
        UserName: "santi",
        fullName: "Beja ",
        email: "santi@email.com",
        phone: 345678,
        address: "123 fake st",
        admin: true
    },
    {
        UserName: "Pepita",
        fullName: "smith",
        email: "pep@email.com",
        phone: 345678,
        address: "null",
        admin: true
    }
]


// save token in local storage
app.post('/posts', verifyToken, (req, res) => {

    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if(err){
            res.sendStatus(403).json({
                message: err
            });
        } else {
            res.json({
                // check 
                message: 'Lo logro, el h perra lo logroo',
                authData,
                list: posts
            });
        }
    });
    
});

app.post('/login1', (req, res) => {
    bcrypt.hash(req.body.myPassword, saltRounds, function(err, hash) {
        
    });
});

const myPassword = 'keeper20';



app.post('/login', (req, res) => {
    // auth User
    const user = {
        id:1, 
        username: 'sant',
        email: "ttsbp@hot.com"
    }

    jwt.sign({user}, 'secretKey', (err, token) => {
        res.json({
            token
        });
    });


});

// FORMAT OF TOKKEN 
// AUTHORIZATION: BEARRER<ACCESS_TOKEN>

// Verify token
function verifyToken(req, res, next){
    // get auth header value
    const bearerHeader = req.headers['authorization'];
    // check if bearer is undefined
    if(typeof bearerHeader !== 'undefined'){
        // split at the space 
        const bearer = bearerHeader.split(' ');
        // get token from array
        const bearerToken = bearer[1];
        // set the token
        req.token = bearerToken;
        next(); 
    } else {
        res.status(403).json({
            message: 'you dont have access'
        });
    }
}




module.exports = app /*validateUser*/;
