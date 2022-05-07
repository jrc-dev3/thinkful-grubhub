const path = require("path");

// Use the existing order data
const orders = require(path.resolve("src/data/orders-data"));

// Use this function to assigh ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /orders handlers needed to make the tests pass
//In the src/orders/orders.controller.js file, add handlers and middleware functions to create, read, update, delete, and list orders.


const validateBody = (req,res,next) => {

    const {data = {deliverTo, mobileNumber, dishes } = {}} = req.body

    const { deliverTo, mobileNumber, dishes } = data

    if(!deliverTo) next({status: 400, message: "Order must include a deliverTo"})
    if(!mobileNumber) next({status: 400, message: "Order must include a mobileNumber"})
    if(!dishes) next({status: 400, message: "Order must include at least one dish"})
    if(!Array.isArray(dishes)) next({status: 400, message: "Order must include at least one dish"})

    if(dishes.length === 0) next({status: 400, message: "Order must include at least one dish"})

    dishes.map((dish,index) => {
        if(!Number.isInteger(dish.quantity)) next({status: 400, message: `Dish ${index} must have a quantity that is an integer greater than 0`})
        if(dish.quantity <= 0) next({status: 400, message: `Dish ${index} must have a quantity that is an integer greater than 0`})
    })

    res.locals.body = data
    next()

}

const validateUpdateBody = (req,res,next) => {

    const orderId = res.locals.orderId
    const body = res.locals.body

    const { id, status } = body

    if(id){
        if(orderId !== id) next({status: 400, message: `Order id does not match route id. Order: ${id}, Route: ${orderId}.`})
    }

    if(!/^(pending|preparing|out-for-delivery|delivered)$/.test(status)) next({status: 400, message: "Order must have a status of pending, preparing, out-for-delivery, delivered"})
    if(status === "delivered") next({status: 400, message: "A delivered order cannot be changed"})

    next()

}



const hasOrderId = (req,res,next) => {
    const {orderId} = req.params

    if(orderId){
        res.locals.orderId = orderId
        next()
    }

    next({
        status: 404,
        message: `orderId`
    })

}

const orderExists = (req,res,next) => {
    const orderId = res.locals.orderId
    const theOrder = orders.find(o => o.id === orderId)

    if(theOrder){
        res.locals.theOrder = theOrder
        next()
    }
    
    next({
        status: 404,
        message: `${orderId}`
    })

}


const create = (req,res,next) => {

    const body = res.locals.body

    const newOrder = {
        ...body,
        id: nextId()
    }

    orders.push(newOrder)
    res.status(201).json({data: newOrder})
    
}


const read = (req,res,next) => {

    const theOrder = res.locals.theOrder
    res.json({data: theOrder})
    
}

const update = (req,res,next) => {
    const body = res.locals.body
    delete body.id
    const theOrder = res.locals.theOrder
    
    Object.keys(body).forEach( item => theOrder[item] = body[item] )
    res.json({data: theOrder})

    
}

const list = (req,res,next) => {
    res.json({data : orders})
}

const destroy = (req,res,next) => {

    const theOrder = res.locals.theOrder

    if(theOrder.status !== "pending") next({status: 400, message: "An order cannot be deleted unless it is pending"})

    const orderIndex = orders.find(o => o.id == theOrder.id)
    orders.splice(orderIndex,1)
    res.sendStatus(204)


}

module.exports = {
    create,
    read,
    update,
    list,
    destroy,
    validateBody,
    validateUpdateBody,
    hasOrderId,
    orderExists
}