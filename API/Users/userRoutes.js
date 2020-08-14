const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const db = require('../../SQL/SQLRoutes');

const app = express();
app.use(bodyParser.json());

// END TO HANDLE ERRORS
app.use(function (err, req, res, next){
  console.log(err.stack);
  res.status(500).send('Server Error, Something broke!');
  res.render('error:', {error: err})
  next();
});


const admin = {
  "fullName": "Santi",
  "fullName": "Beja P",
  "adminEmail": "santi@email.com",
  "adminPassword": 123456,
  "admin": "true"
} 


// async functions 
// EMP to validate users
function validateAdmin (req, res, next){
  const {email, password} = req.body;
  if (req.body.adminEmail !== admin.adminEmail || req.body.adminPassword !== admin.adminPassword){
    res.status(403).json('Email or Password incorrect');
  }else {
    console.log('validated successfully');
    next();
  }
}


//EMP to get all the uses '/Users'
app.get('/', validateAdmin, (req, res) => {
  let sql = 'SELECT * FROM base_resto.users';
  db.query(sql, (err, result) => {
    if(err){
      res.status(403).json({
        message: 'you dont have access'
      });
    } else {
      res.status(200).json({
        message: 'Users List',
        list: result
      });  
    }
  });
});


// EMP to get info by ID
app.get("/:userId", validateAdmin, (req, res) => {
  const id = req.params.userId;
  let sql = `SELECT * FROM base_resto.users WHERE userId = ${id}`; 
  db.query(sql, (err, result) => {
    if(err){
      res.status(403).json({
        message: 'you dont have access'
      });
    } else {
      res.status(200).json({
        message: 'User information',
        list: result
      })
    }
  });
});


// CHECK validateAdmin
// EMP to created Users
app.post('/add', (req, res) => {
  let sql = `INSERT INTO base_resto.users SET userName = '${req.body.userName}', fullName = '${req.body.fullName}', email = '${req.body.email}', phone = ${req.body.phone}, address = '${req.body.address}'`;
  db.query(sql, (err,  result) => {
    if(err){
      console.log(err);
      res.status(400).json({
        message: 'bad resquest'
      });
    } else {
        res.status(200).json({
          message: 'User created Successfully',
          list: result
        });
    }
  });
});


// check, not working properly, 
//  EMP to update users
app.patch('/:userId', (req, res) => {
  const id = req.params.userId;
  let sql = `UPDATE base_resto.users SET userName = '${req.body.userName}', fullName = '${req.body.fullName}', email = '${req.body.email}', phone = ${req.body.phone}, address = '${req.body.address}' 
  WHERE userId = ${id}`;
  db.query(sql, (err, result) => {
    if(err){
      console.log(err);
      res.status(400).json({
        message: 'bad resquest'
      });
    } else {
      res.status(200).json({
        message: `you upgrade the user ID: ${id}`,
        list: result 
      });
    }
    });
});


// EMP to Delete users
app.delete('/:userId', validateAdmin, (req, res) => {
  const id = req.params.userId;
  const sql = `DELETE FROM base_resto.users WHERE userId  = ${id}`;
  db.query(sql, (err, result) => {
    if(err){
      res.status(403).json({
        message: 'you dont have access'
      });
    } else {
      res.status(200).json({
        message: `you just deleted User ID: ${id}`,
        list: result
      });
    }
  });
});

module.exports =  app;
// check 
// exports.exisUser;

