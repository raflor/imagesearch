var mongoose = require("mongoose");

var search = mongoose.Schema({
    term: String,
    when: { type: Date, default: Date.now }

});
var counter_schema = mongoose.Schema({
    counter: Number
});
var provider =  mongoose.model('lastsearch', search);

module.exports = provider;