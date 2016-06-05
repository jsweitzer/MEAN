var express = require('express');
var app = express();

app.get('/echo/:check', function(req, res){
	var check = req.params.check;
	console.log(check);
	res.json(check);
});

app.listen(80);
console.log("Node is listening at port 80");