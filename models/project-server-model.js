var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema =new Schema({
    name: {type: String, required: true},
    description: String
});

module.exports = mongoose.model('Project', schema);

