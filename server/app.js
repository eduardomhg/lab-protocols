var pjson = require('../package.json');

console.log('Lab Protocols web app version %s', pjson.version);

var express = require('express');
var mongoose = require('mongoose');

var app = express();

app.use(express.static('app'));

app.get('/', function (req, res) {
    console.log('route / requested');
    return res.redirect('/index.html');
});

console.log('Connecting to database at %s...', 'mongodb://localhost/test');
mongoose.connect('mongodb://localhost/test', function (err) {
    if (err) {
        console.log('Error connecting to database: %s', err);
    } else {
        console.log('Connected to database');
    }

    var server = app.listen(process.env.PORT || 8000, function () {
        var host = server.address().address;
        var port = server.address().port;
    
        console.log('ExpressJS Server listening at http://%s:%s', host, port);
    });
});







