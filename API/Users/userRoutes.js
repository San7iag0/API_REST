const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const db = require('../../SQL/SQLRoutes');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const app = express();
app.use(bodyParser.json());

// check this end to another file
// END TO HANDLE ERRORS
app.use(function (err, req, res, next){
  console.log(err.stack);
  res.status(500).send('Server Error, Something broke!');
  res.render('error:', {error: err})
  next();
});


const adminUsers = [
  {
    userName: "santi",
    fullName: "Beja ",
    email: "santi@email.com",
    phone: 345678,
    address: "123 fake st",
    password: 123456,
    admin: true
  },
  {
    userName: "Pepita",
    fullName: "smith",
    email: "pep@email.com",
    phone: 345678,
    address: "null",
    password: 123456,
    admin: true
  }
]

const admin = {
  email: "pep@email.com",
  password: 123456
}

// async functions 
// EMP to validate users
function validateAdmin (req, res, next){
  const {email, password} = req.body;
  if (req.body.email !== admin.email || req.body.password !== admin.password){
    res.status(403).json('Email or Password incorrect');
  }else {
    console.log('validated successfully');
    next();
  }
}

// add validate function
//EMP to get all the uses '/Users'
app.get('/',  (req, res) => {
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

// check esta mierda no esta funcionando revisar manejo de errores 
// check for admin
// EMP to get info by ID
app.get("/:userId", (req, res) => {
  try{
    const id = req.params.userId;
    let sql = `SELECT * FROM base_resto.users WHERE userId = ${id}`; 
    db.query(sql, (err, result) => {
      if(err){
        res.status(403).json({
          message: 'Wrong user Id'
        });
      } else {
        res.status(200).json({
          message: 'User information',
          list: result
        })
      }
    });
  } catch (res) {

  }
});

// check for data when you save on db
// CHECK for Admin
// EMP to created Users
app.post('/create', (req, res) => { 
  bcrypt.hash(`${req.body.password}`, saltRounds, function (err, hash) {   
    let sql = `INSERT INTO base_resto.users SET userName = '${req.body.userName}', fullName = '${req.body.fullName}', email = '${req.body.email}', phone = ${req.body.phone}, address = '${req.body.address}', password = '${hash}'`;
    db.query(sql, (err,  result) => {
      if(err){
        console.log(err);
        res.status(400).json({
          message: 'bad resquest'
        });
      } else {
        res.status(200).json({
          message: 'User create Successfully',
          list: result
        });
      }
    });
  });
});

app.post('/login', (req, res) => {
  let authEmail = req.body.email;
  let sql = `SELECT * FROM base_resto.users WHERE email = '${authEmail}'`;
  db.query(sql, (err, result) => {
    console.log(result);
    if(result[0].email != authEmail ){
      res.status(400).json({
        message: 'wrong Email Or password'
      });
    } else {
      bcrypt.compare(`${req.body.password}`, `${result[0].password}`, function(err, result1) {
        if(result1 == true){
          res.status(200).json({
            // check
            message: 'got it'
          })
        } else {
          // check
          // console.log(err);
          // console.log('you stink');
          res.status(404).json({
            // check
            message:'err'
          })
        }
      });
    }
  });
});

// check borrar 
// santi@email.com

// check, not working properly, the fucking error validation is not f working 
//  EMP to update users
// check for user auth
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

// check for adming auth
// EMP to Delete users
app.delete('/:userId', (req, res) => {
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
