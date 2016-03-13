var express = require("express"),
    mongoose = require("mongoose"),
    provider = require("./searches.js"),
    router = express.Router();

router.get('/', function(req, res) {
    provider.find().select('-_id term when').exec(function(err,doc){
        if(err) return console.error(err);
        res.send(doc);
    });
    
});
module.exports = router;