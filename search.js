var express = require("express"),
    https = require('https'),
    mongoose = require("mongoose"),
    provider = require("./searches.js"),
    router = express.Router();

router.get('/:search', function(req, res) {
    if (req.query.offset) {
        var offset = req.query.offset;
    }
    else {
        var offset = 0;
    }
    var options = {
        host: "www.googleapis.com",
        path: "/customsearch/v1?q=" + req.params.search + "&cx=002651586384774400056%3Ag8jb8ey9tfy&searchType=image&num=" + (parseInt(offset) + 1) + "&key=AIzaSyCzVj2jlbHV1PEhijL6WENeEjJ_PFC1Qwk"
    };

    var callback = function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            var resp = JSON.parse(body);
            res.send(resp.items[offset]);
        });

    };

    https.get(options, callback).on('error', function(e) {
        console.error(e);
    });
    var time = new Date();
    new provider({
        term: req.params.search,
        when: time.toISOString()
    }).save(function(err,res){
        if (err) return console.error(err);
    })

});

module.exports = router;
