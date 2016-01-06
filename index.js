/*jslint node:true, es5:true */
'use strict';

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    http = require("http"),
    server = http.createServer(app),
    mongoose = require('mongoose');

//Models
var DespachoCtrl = require('./controllers/despacho');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();
var despacho = express.Router();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

despacho.route('/despacho')
    .get(DespachoCtrl.findAllDespachos)
    .post(DespachoCtrl.addDespacho);

despacho.route('/despacho/:id')
    .get(DespachoCtrl.findById)
    .put(DespachoCtrl.updateDespacho)
    .delete(DespachoCtrl.deleteDespacho);

router.get('/', function (req, res) {
    res.send("MEAN!");
});

app.use('/api', despacho);
app.use(router);

mongoose.connect('mongodb://192.168.1.39/despacho', function (err, res) {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    }
    app.listen(3000, function () {
        console.log("Node server running on http://localhost:3000");
    });
});
