var express = require('express');
var mongoose = require('mongoose');
var Protocol = require('../../common/models/Protocol.js');
var bodyParser = require('body-parser');

// Router object from express, using to do all the routing.
var router = express.Router();

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET /protocols listing. */
router.get('/', function (req, res, next) {
    console.log('route /protocols GET requested');
    Protocol.find(function (err, protocols) {
        if (err) return next(err);
        //res.send(protocols[0].title);
        res.json(protocols);
    });
});

/* POST /protocols */
router.post('/', jsonParser, function (req, res, next) {
    console.log('route /protocols POST requested');
    console.log('body: ' + req.body);
    Protocol.create(req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* GET /protocols/id */
router.get('/:id', function (req, res, next) {
    console.log('route /protocols/' + req.params.id + ' GET requested');
    Protocol.findById(req.params.id, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* PUT /protocols/:id */
router.put('/:id', function (req, res, next) {
    console.log('route /protocols/' + req.params.id + ' PUT requested');
    Protocol.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /protocols/:id */
router.delete('/:id', function (req, res, next) {
    console.log('route /protocols/' + req.params.id + ' DELETE requested');
    Protocol.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

/* DELETE /protocols */
router.delete('/', function (req, res, next) {
    console.log('route /protocols DELETE requested');
    Protocol.remove({}, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;
