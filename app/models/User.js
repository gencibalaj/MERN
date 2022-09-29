const mongoose = require('mongoose')

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthday: { type: Date },
    todo: { type: [], default: [] },
    active: { type: Boolean, default: false },
    confirmation_code: { type: String, required: false },
    role: {
        type: String,
        enum : ['USER','LEADER','HR'],
        default: 'USER'
    }});

//todos can be be populated with taskIds from Task model

var User = mongoose.model('users', UserSchema);

module.exports = User;