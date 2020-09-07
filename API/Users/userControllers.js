const express = require("express");
const app = express();
const bodyPaser = require("body-parser");
const jwt = require ('jsonwebtoken');
const db = require('../../SQL/SQLRoutes');

app.use(bodyPaser.json());

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

// -----------------------
// verify  jwt save on headers 
// check, change that ws name
app.post('/api/posts', verifyToken, (req, res) => {
    jwt.verify(req.token, "secretKey", (err, authData) => {
        if(err){
            res.sendStatus(403); //forbiden
        } else {
            res.json({
                // check for message
                message: 'up and running',
                authData,
            });
        }
    });
  });

  app.post('/api/login', (req, res) => {
    //   created user with The EMAIL as an object 
    const user = {
        // `${result[0].email}`
      Email: 'santi@mail.com' // ejem check delete 
    }
    jwt.sign({user: user}, "secretKey", (err, token) => {
      res.json({
        token, 
      })
    });
  });

// FORMAT OF TOKKEN 
// Verify token on headers 
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

module.exports = app;
