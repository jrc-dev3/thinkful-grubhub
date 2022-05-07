const path = require("path");

// Use the existing dishes data
const dishes = require(path.resolve("src/data/dishes-data"));

// Use this function to assign ID's when necessary
const nextId = require("../utils/nextId");

// TODO: Implement the /dishes handlers needed to make the tests pass
// In the src/dishes/dishes.controller.js file, add handlers and middleware functions to create, read, update, and list dishes. Note that dishes cannot be deleted.

const hasDishId = (req,res,next) => {
    const {dishId} = req.params

    if(dishId){

        res.locals.dishId = dishId
        next()
    }

    next({
        status: 404,
        message: "dishId"
    })
}

const dishIdExists = (req,res,next) => {
    const dishId = res.locals.dishId
    const dish = dishes.find(d => d.id == dishId)

    if(dish){
        res.locals.dish = dish
        next()
    }

    next({
        status: 404,
        message: `Dish does not exist: ${dishId}.`
    })
}

const validateBody = (req,res,next) => {
    const {data = {name, description, price, image_url} = {}} = req.body

    const { name, description, price, image_url } = data


    if(!name) next({status: 400, message: "Dish must include a name"})
    if(!description) next({status: 400, message: "Dish must include a description"})
    if(!price) next({status: 400, message: "Dish must include a price"})
    if(!Number.isInteger(price)) next({status: 400, message: "Dish must have a price that is an integer greater than 0"})
    if(price <= 0) next({status: 400, message: "Dish must have a price that is an integer greater than 0"})
    if(!image_url) next({status: 400, message: "Dish must include a image_url"})

    res.locals.body = data
    next()

}

const validateUpdateBody = (req,res,next) => {
    const body = res.locals.body
    const dishId = res.locals.dishId

    if(body.id){
        if(dishId != body.id) next({status: 400, message: `Dish id does not match route id. Dish: ${body.id}, Route: ${dishId}`})
    }

    next()

}

const create = (req,res,next) => {
    const body = res.locals.body

    const newDish = {
        ...body,
        id: nextId()
    }

    dishes.push(newDish)
    res.status(201).json({data: newDish})
    
}


const read = (req,res,next) => {
    const dish = res.locals.dish
    res.json({data: dish})    
}

const update = (req,res,next) => {


    const dish = res.locals.dish
    const body = res.locals.body

    Object.keys(body).forEach( item => dish[item] = body[item] )

    res.json({data: dish})


}

const list = (req,res,next) => {
    res.json({data: dishes})
    
}

module.exports = {
    create,
    read,
    update,
    list,
    hasDishId,
    dishIdExists,
    validateBody,
    validateUpdateBody
}