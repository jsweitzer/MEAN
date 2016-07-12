var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('zipcodes', ['uszips']);
//
app.get('/zipcodes/:zipcode', function(req, res) {
	var zipcode = req.params.zipcode;
	db.uszips.findOne({_id: zipcode}, function(err, doc) {
		res.json(doc);
	});
});

app.listen(80);