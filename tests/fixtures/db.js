const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/model/user')
const Task = require('../../src/model/task')

const userId = new mongoose.Types.ObjectId()
const dummyUser= {
    _id: userId,
    name: 'Ibrahim',
    email: 'hima.abousalem@gmail.com',
    password: 'pass12345!',
    tokens: [{
            token: jwt.sign({_id: userId}, process.env.JWT_SECRET)
    }]
}

const user2Id = new mongoose.Types.ObjectId()
const dummy2User= {
    _id: user2Id,
    name: 'Abousalem',
    email: 'abousalem@gmail.com',
    password: 'pass12345!',
    tokens: [{
            token: jwt.sign({_id: user2Id}, process.env.JWT_SECRET)
    }]
}
const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'task one',
    completed: false,
    owner: dummyUser._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'task two',
    completed: false,
    owner: dummyUser._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'task three',
    completed: false,
    owner: dummy2User._id
}

const setupDatabase = async()=>{
    await User.deleteMany()
    await Task.deleteMany()
    await new User(dummyUser).save()
    await new User(dummy2User).save()
    await new Task(taskOne).save()
    await new Task(taskTwo).save()
    await new Task(taskThree).save()
}

module.exports = {
    userId,
    dummyUser,
    user2Id,
    dummy2User,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}