const express= require('express')
const auth = require('../middleware/auth')
const Task = require('../model/task')

const taskRouter = express.Router()

taskRouter.post('/tasks', auth,async(req, res)=>{
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    task.owner = req.user._id
    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})
taskRouter.get('/tasks', auth, async(req, res)=>{
    try {
        //we can use this
        //const tasks = await Task.find({owner: req.user._id})
        //or this 
        await req.user.populate('tasks').execPopulate()
        res.send(req.user.tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

taskRouter.get('/tasks/:id', auth, async(req, res)=>{
    const _id = req.params.id
    try {
        const task = await Task.findOne({owner: req.user._id, _id})
        if(!task){
            return res.status(404).send()
        } 
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

taskRouter.patch('/tasks/:id', auth, async(req, res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidUpdate = updates.every((update)=> allowedUpdates.includes(update))
    if(!isValidUpdate){
        res.status(400).send({error: 'Invalid Updates!'})
    }
    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})
        if(!task){
            res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

taskRouter.delete('/tasks/:id', auth, async(req, res)=>{
    try {
        const task = await Task.findOneAndDelete({_id:req.params.id, owner: req.user._id})
        if(!task){
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = taskRouter