const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require("cors");

const users = require('./routes/users');
const profile = require('./routes/profile');
const todos = require('./routes/todos');


const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
}

const app = express();
const PORT = process.env.PORT || 8282;

const mongoDB = 'mongodb://127.0.0.1/fsch_database';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions))


app.get('/', (req, res) => {
    res.send("Welcome to fsch app")
})

app.use('/api/users', users) //done
app.use('/api/profile', profile) //done
app.use('/api/todos', todos) //inprogress

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found!"
    })
})

app.listen(PORT, () => console.log(`App runing in ${PORT} port!`));
mongoose.connect(mongoDB, function (error) {
    if (error) throw error
    console.log('Connected to MongoDB');
})
