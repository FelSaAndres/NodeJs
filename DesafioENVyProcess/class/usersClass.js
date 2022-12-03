const express = require('express')
const mongoose = require('mongoose')
const { userModel } = require('../models/usersModel')
require('dotenv').config()

class Users{
    constructor(){
        this.path = process.env.MONGO_PATH
        //"mongodb+srv://proyectonode:proyectonode@cluster0.cynne3g.mongodb.net/?retryWrites=true&w=majority"
        this.mongodb = mongoose.connect
    }

    async newUser(user){
        try {
            await this.mongodb(this.path)
            const newUser = new userModel(user)
            await newUser.save()
        } catch (error) {console.log(error)}
    }

    async getAll(){
        try {
            await this.mongodb(this.path)
            const users = await userModel.find({})
            return users
        } catch (error) {console.log(error)}
    }
}

module.exports = { Users }