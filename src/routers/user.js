const express= require('express')
const User = require('../model/user')

const userRouter = express.Router()

userRouter.post('/users', async(req, res)=>{
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

userRouter.get('/users',async(req, res)=>{
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }
})

userRouter.get('/users/:id',async(req, res)=>{
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if(!user){
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

userRouter.patch('/users/:id', async(req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password','age']
    const isValidUpdate = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidUpdate){
        res.status(400).send({error: 'Invalid Updates!'})
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body,{new: true, runValidators: true})
        if(!user){
            res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

userRouter.delete('/users/:id',async (req, res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = userRouter