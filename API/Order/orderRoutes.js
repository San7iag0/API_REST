const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
// const Sequelize = require('sequelize');
const app = express();
const db = require('../../SQL/SQLRoutes');
// const router = express.Router();
// const server = express();
app.use(bodyParser.json());

// const validateAdmin = require('./');

// all orders might be visible just for admins 
// EMP to get all orders list
// handle GET request to /oders
app.get("/", (req, res) =>{
    try{
        let sql = 'SELECT * FROM base_resto.orders';
        db.query(sql, (err, result) => {
            if(err){
                console.log(err);
            } else { 
                res.status(200).json({
                    message: 'Orders list',
                    list: result
                });
            }
        });
    } catch (err) {
        // check for errors 
    }
});


// EMP to get orders by userId
app.get("/:userId", (req, res) => {
    const id = req.params.userId;
        let sql = `SELECT * FROM base_resto.orders WHERE userId = ${id}`;
        db.query(sql, (err, result) => {
            if(err){
              console.log(err);
            } else {
              res.status(200).json({
                    // check for the name of the user on the message 
                    message: `There you can find the list of orders for ${id}`,
                    list: result 
                })
            }
        });
});


// check -- Just the admin will be able to create orders 
// EMP to create orders
app.post('/add', (req, res) => {
    const userId = req.body.userId;
        let sql = `INSERT INTO base_resto.orders SET products = "${req.body.products}", address = "${req.body.address}", userId = ${userId}`;
        db.query(sql, (err, result) => {
            if(err){
                console.log(err);
                res.status(400).json({
                message: 'bad resquest'
                });
            } else {
                res.status(200).json({
                    message: 'Order created',
                    list: result
                });
            }
        });  
});


app.patch('/:orderId', (req, res) => {
    const id = req.params.orderId;
    try{
        let sql = `UPDATE base_resto.orders SET products = "${req.body.products}", address = "${req.body.address}" WHERE orderId = ${id}`;

        db.query(sql, (err, result) => {
            if(err){
                console.log(err);
            } else {
                res.status(200).json({
                    message: 'Order updated sucessful',
                    list: result
                })
            }
        });
    } catch (err) {
        // check for errors
        // request defined wrong
        console.log(err);
    }
});


// EMP TO DELETE ODERS
// check just admins will be able to delete orders
app.delete('/delete/:orderId', (req, res) => {
    const id = req.params.orderId;
    try{
        let sql = `DELETE FROM base_resto.orders WHERE orderId = ${id}`;
        db.query(sql, (err, result) => {
            if(err) {
                console.log(err);
                // check
            } else {
                res.status(200).json({
                    message: `You delete the order #${id}`,
                    list: result
                })
            }
        })
    } catch {
        // check for errors 
    }

});


module.exports = app;
