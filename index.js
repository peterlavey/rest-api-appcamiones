/*jslint node:true, es5:true */
'use strict';

var minimist = require('minimist');

var knownOptions = {
    string: 'env',
    default: {
        dest: process.env.NODE_ENV || 'peter'
    }
};
var options = minimist(process.argv.slice(2), knownOptions);
var config = require("./config")(options);

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    http = require("http"),
    server = http.createServer(app),
    mongoose = require('mongoose');

//Models
var DespachoCtrl = require('./controllers/despacho');
var RutaCtrl = require('./controllers/ruta');

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();
var despacho = express.Router();
var ruta = express.Router();

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', config.url.app);

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
    .put(DespachoCtrl.updateDespacho)
    .delete(DespachoCtrl.deleteDespacho);

ruta.route('/ruta')
    .get(RutaCtrl.findAllRutas)
    .post(RutaCtrl.addRuta);

ruta.route('/ruta/:id')
    .get(RutaCtrl.findDespachos)
    .put(RutaCtrl.updateRuta)
    .delete(RutaCtrl.deleteRuta);

router.get('/', function (req, res) {
    res.send("App Camiones Index");
});

app.use('/api', despacho);
app.use('/api', ruta);
app.use(router);

mongoose.connect(config.url.mongo, function (err, res) {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    }
    app.listen(config.port, function () {
        console.log("Node server running on http://localhost:" + config.port);
    });
});
