var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('zipcodes', ['zipcodes']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/contactlist', function(req, res) {
	console.log("GET received.")
	db.contactlist.find(function (err, docs) {
		console.log(docs);
		res.json(docs);
	});
});

app.post('/contactlist', function(req, res) {
	console.log(req.body);
	db.contactlist.insert(req.body, function(err, doc) {
		res.json(doc);
	});
});

app.delete('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.get('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.put('/contactlist/:id', function(req, res) {
	var id = req.params.id;
	console.log(req.body);
	db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)}, 
		update: {$set: {name: req.body.name, email: req.body.email, phone: req.body.phone}},
		new: true}, function (err, doc) {
			res.json(doc);
		});
});

app.get('/zipcodes/:zipcode', function(req, res) {
	var zipcode = req.params.zipcode;
	console.log(zipcode);
	db.zipcodes.findOne({_id: zipcode}, function(err, doc) {
		res.json(doc);
	});
});

app.listen(8081, '0.0.0.0');
console.log("Server is listening at port 8081");