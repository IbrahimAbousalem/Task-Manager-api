const request = require('supertest')
const app = require('../src/app')
const Task = require('../src/model/task')
const {
    userId,
    dummyUser,
    user2Id, 
    dummy2User, 
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
} = require('./fixtures/db')

beforeEach(setupDatabase)

test('should create task for user',async ()=>{
    const response = await request(app).post('/tasks')
    .set('Authorization', `Bearer ${dummyUser.tokens[0].token}`)
    .send({
        description: 'task1'
    })
    .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toEqual(false)
})

test('should fetch tasks for specific user',async ()=>{
    const response = await request(app).get('/tasks')
    .set('Authorization', `Bearer ${dummyUser.tokens[0].token}`)
    .send()
    .expect(200)
    expect(response.body.length).toEqual(2)
})

test('Should not delete task for another user', async()=>{
    await request(app).delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${dummy2User.tokens[0].token}`)
    .send()
    .expect(404)
    const task = await Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})
