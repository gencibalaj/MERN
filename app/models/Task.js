const mongoose = require('mongoose')

var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    name: { type: String, required: true },
    team: { type: String, required: true },
    leader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' , required: true},
    employees: [{type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    assigned_date: { type: Date, required: true },
    deadline: { type: Date },
    done: {type: Boolean, default: false}
});


var Task = mongoose.model('tasks', TaskSchema);

module.exports = Task;