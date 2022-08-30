const mongoose = require('mongoose')

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthday: { type: Date },
    todo: { type: [], default: [] },
});

// Compile model from schema
var User = mongoose.model('users', UserSchema);

module.exports = User;