const { default: mongoose } = require('mongoose')
const request = require('supertest')
const app = require('../app')
const User = require('../models/User')
const { hashpassword } = require('../helpers/encrypting')

const testUserID = new mongoose.Types.ObjectId()
const testUser = {
    _id: testUserID,
    first_name: "genc",
    last_name: "balaj",
    email: "gencibalaj@gmail.com",
    password: "Gencibalaj1",
    passwordConfirmation: "Gencibalaj1",
    birthday: "1999/05/07"
}


beforeEach(async () => {
    await User.deleteMany()
    await new User({
        first_name: "genc",
        last_name: "balaj",
        email: "ggaag@gmail.com",
        password: await hashpassword("Gencibalaj1"),
        passwordConfirmation: await hashpassword("Gencibalaj1"),
        birthday: "1999/05/07",
        todo: ["first"]
    }).save()
})

//USERS testing
test('Should signup a new user', async () => {
    const response = await request(app).post('/api/users/register').send(testUser).expect(201)
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    expect(response.body).toEqual(expect.objectContaining({
        success: expect.any(Boolean),
        message: expect.any(String),
        user: expect.any(Object)
    }))
})


let token = ''
test('Should login and return token', async () => {
    const response = await request(app).post('/api/users/login').send({
        email: 'ggaag@gmail.com',
        password: "Gencibalaj1"
    }).expect(200)
    token = response._body.token
})

test('Should not return token because of bad credentials!', async () => {
    const response = await request(app).post('/api/users/login').send({
        email: 'ggaag@gmail.com',
        password: "thisIsTheWrongPassword"
    }).expect(401)
})



test('Should return profile of the User', async () => {
    console.log(token)
    await request(app).get('/api/profile/me').set({ Authorization: `Bearer ${token}` }).expect(200)
})


test('Should not return profile of the User, without authorization', async () => {
    await request(app).get('/api/profile/me').expect(401)
})

//------------------------------------------------------------------------------------------------------------------
//TODOS testing
// return todos
test('Should return todos of a user', async () => {
    const response = await request(app).get('/api/todos').set({ Authorization: `Bearer ${token}` }).expect(200)
    expect(response.body.todos).not.toBeNull()
})

// do not return todos
test('Should not return todos of a user, without authorization', async () => {
    await request(app).get('/api/todos').expect(401)
})

//add a todo
test('Should add a todo to the user logged in', async () => {
    await request(app).post('/api/todos/add/GYM').set({ Authorization: `Bearer ${token}` }).expect(200)
    const userWithTodo = await User.find({ todo: "GYM" })
    expect(userWithTodo.length).not.toEqual(0)
})

//remove a todo
test('Should remove a todo from the user logged in', async () => {
    await request(app).delete('/api/todos/remove/first').set({ Authorization: `Bearer ${token}` }).expect(200)
    const userWithoutTodo = await User.find({ todo: "first" })
    expect(userWithoutTodo.length).toEqual(0)
})

//do not remove a todo
test('Should not remove a todo from the user because no authorization is provided', async () => {
    await request(app).delete('/api/todos/remove/first').expect(401)
})

