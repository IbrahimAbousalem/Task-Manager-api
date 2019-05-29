const request = require('supertest')
const {userId, dummyUser, setupDatabase} = require('./fixtures/db')
const app = require('../src/app')
const User = require('../src/model/user')

beforeEach(setupDatabase)

test('Should signup a new user', async () => {
    const response = await request(app).post('/users').send({
        name: 'test',
        email: 'test@example.com',
        password: 'MyPass777!'
    }).expect(201)

    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()
    expect(response.body).toMatchObject({
        user: {
            name: 'test',
            email: 'test@example.com'
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('MyPass777!')
})

test('Should login existing user', async ()=>{
    const response = await request(app).post('/users/login').send({
        email: dummyUser.email,
        password: dummyUser.password
    }).expect(200)
    const user = await User.findById(userId)
    expect(response.body.token).toBe(user.tokens[1].token)
})

test('Should not login non existing user', async ()=>{
    await request(app).post('/users/login').send({
        email: 'test.failuer@gmail.com',
        password: dummyUser.password
    }).expect(400)
})

test('Should get profile for user', async()=>{
    await request(app).get('/users/me')
    .set('Authorization', `Bearer ${dummyUser.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not get profile for unauthenticated user', async()=>{
    await request(app).get('/users/me')
    .send()
    .expect(401)
})

test('Should delete account for user', async()=>{
    await request(app).delete('/users/me')
    .set('Authorization', `Bearer ${dummyUser.tokens[0].token}`)
    .send()
    .expect(200)
    const user = await User.findById(userId)
    expect(user).toBeNull()
})

test('Should not delete account for unauthenticated user', async()=>{
    await request(app).delete('/users/me')
    .send()
    .expect(401)
})

test('Should upload avatar image', async()=>{
    await request(app).post('/users/me/avatar')
    .set('Authorization',`Bearer ${dummyUser.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/profile-pic.jpg')
    .expect(200)
    const user = await User.findById(userId)
    expect(user.avatar).toEqual(expect.any(Buffer)) 
})

test('Should update valid user fields', async()=>{
    await request(app).patch('/users/me')
    .set('Authorization',`Bearer ${dummyUser.tokens[0].token}`)
    .send({
        name: 'Mohamed'
    }).expect(200)
    const user = await User.findById(userId)
    expect(user.name).toBe('Mohamed')
})

test('Should not update invalid user field', async()=>{
    await request(app).patch('/users/me')
    .set('Authorization',`Bearer ${dummyUser.tokens[0].token}`)
    .send({
        location: 'cairo'
    })
    .expect(400)
})

test('Should not signup user with invalid email', async()=>{
    await request(app).post('/users').send({
        name: 'example',
        email: 'testexample.com',
        password: 'MyPass777!'
    })
    .expect(400)
})
