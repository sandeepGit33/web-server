var express = require('express');
var app = express();
var PORT = 3000;

// app.get('/', function (req, res) {
// 	res.send('Hello Express !');
// });


var middleware = {
	requireAuthentication: function (req, res, next) {
		console.log('Private route hit!');
		next();
	},
	logger: function (req, res, next) {
		var date = new Date().toString();
		console.log('Request: '+ req.method + ' ' + req.originalUrl);
		console.log('Dated: ' + date);
		next();
	}
};

app.use(middleware.logger);
// app.use(middleware.requireAuthentication);

app.get('/about', middleware.requireAuthentication, function (req, res) {
	res.send('About us!');
});

app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/public/home'));

app.listen(PORT, function(){
	console.log('Express server started at port: ' + PORT);
});