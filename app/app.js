const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");

const users = require('./routes/users');
const profile = require('./routes/profile');
const todos = require('./routes/todos');
const teams = require('./routes/teams');
const tasks = require('./routes/tasks');

const MONGODB_URL = process.env.MONGODB_URL;

const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions))


app.get('/', (req, res) => {
    res.send("Welcome to fsch app")
})

app.use('/api/users', users) 
app.use('/api/profile', profile) 
app.use('/api/todos', todos) 
app.use('/api/teams', teams) 
app.use('/api/tasks', tasks)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found!"
    })
})
mongoose.connect(MONGODB_URL, function (error) {
    if (error) throw error
    console.log('Connected to MongoDB');
})

module.exports = app