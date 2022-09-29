const mongoose = require('mongoose')

var Schema = mongoose.Schema;

var TeamSchema = new Schema({
    name: { type: String, required: true },
    leader: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    members: [{ type : mongoose.Schema.Types.ObjectId, ref: 'User' }],
});


//teams model i ri
//roles caktohen ne teams
//HR i alokon perdoruesit ne teams specifik
//emri ekipit, emri adminit(caktohet prej HR), antaret(array i objekteve: roli, teknologjia),




var Team = mongoose.model('teams', TeamSchema);

module.exports = Team;