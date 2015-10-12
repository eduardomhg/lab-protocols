var pjson = require('../package.json');
console.log('Lab Protocols web app version %s', pjson.version);

// Require dependencies.
console.log('Loading node modules...');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Require other app modules.
var protocols = require('./routes/protocols');
var auth = require('./authentication/authentication');

// Crate Express application object.
console.log('Creating application...');
var app = express();
app.get('/', function (req, res) {
    console.log('route / requested');
    return res.redirect('/index.html');
});

// Configure Express application.
console.log('Configuring application...');
app.use(express.static('client')); // Serve all static files from client folder.
app.use(cookieParser()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/protocols', protocols); // Use protocols module.
app.use('/users', auth); // Use authentication module.



// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(err);
});

// Connect to MongoDB database.
console.log('Connecting to database at %s...', 'mongodb://localhost/test');
mongoose.connect('mongodb://localhost/test', function (err) {
    if (err) {
        console.log('Error connecting to database: %s', err);
        process.exit(1);
    } else {
        console.log('Connected to database');

        // Create server listing in Port 8000 or %PORT% environment variable for EBS.
        var server = app.listen(process.env.PORT || 8000, function () {
            var host = server.address().address;
            var port = server.address().port;

            console.log('ExpressJS Server listening at http://%s:%s', host, port);
        });
    }

});

module.exports = app;
