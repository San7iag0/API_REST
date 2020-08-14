const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const db = require('../../SQL/SQLRoutes');

const app = express();

app.use(bodyParser.json());
// const router = express.Router();

const exisUser = require('../Users/userRoutes');

const products = [{
  "productName": "empanada", 
  "price": "1k"
  },
  {
    "productName": "Stroganoff", 
    "price": 4312
  },
  {
    "productName": "watter", 
    "price": 4
  }
]
//EMP to get the product list 
app.get("/", (req, res) => {
  try{
    let sql = 'SELECT * FROM base_resto.products;';
    db.query(sql, (err, result) => {
      if(err){
        console.log(err);
      } else {
        res.status(200).json({
          message: "Product list",
          list: result
        });
      }
    });
  } catch (err){
    console.log(err);
  }
  
});


// check just admin is able to add products 
//Endpoint Create
app.post("/add", (req, res) => {
  try{
    let sql = `INSERT INTO base_resto.products SET productName = '${req.body.productName}', price = ${req.body.price}`;
    db.query(sql, (err, result) => {
      if(err){
        console.log(err);
        res.status(400).json({
          message: 'bad resquest'
        });
      } else {
        res.status(200).json({
          message: 'Product created',
          list: result
        });
    }      
    });
  } catch(err){
    console.log(err);
  }
});


//check 
// get information of a product By the ID 
app.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  try{
    let sql = `SELECT * FROM base_resto.products WHERE productsId = ${id}`; 
    db.query(sql, (err, result) => {
      if(err){
        console(err);
      } else {
        res.status(200).json({
          message: 'product details',
          list: result
        })
      }
    });
  } catch (error){
    console.log(error);
    res.status(400).json({
      message: error
    })
  } 
});


//check 
//check updated products just by the admin 
app.patch('/:productId', (req, res) => {
  const id = req.params.productId;
  try{
    let sql = `UPDATE base_resto.products SET productName = '${req.body.productName}', price = ${req.body.price} WHERE productsId = ${id}`;
    db.query(sql, (err, result) => {
      if(err){
        console.log(err);
      } else {
        res.status(200).json({
          message: `you updated the product id: '${id}'`,
          list: result
        });
      }
    });
  }catch{
    // check // add admin error
  }
});
// check 
app.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  try{
    const sql = `DELETE FROM base_resto.products WHERE productsId = ${id}`;
    db.query(sql, (err, result) => {
      if(err){
        console.log(err);
      } else {
        res.status(200).json({
          message: `you have errace the product ID: ${id}`,
          list: result
        });
      }
    });  
  }catch{
    //check for errors, handle erros
  }
});

  module.exports = app;
