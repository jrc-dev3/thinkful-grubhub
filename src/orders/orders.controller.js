const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /orders handlers needed to make the tests pass

//In the src/orders/orders.controller.js file, add handlers and middleware functions to create, read, update, delete, and list orders.

const create = (req,res,next) => {
    
}


const read = (req,res,next) => {
    
}

const update = (req,res,next) => {
    
}

const list = (req,res,next) => {
    res.json({data : orders})
}

const destroy = (req,res,next) => {

}

module.exports = {
    create,
    read,
    update,
    list,
    destroy
}