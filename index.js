/*jslint node:true, es5:true */
'use strict';

var minimist = require('minimist');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var secret = 'secret123456';

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
var UsuarioCtrl = require('./controllers/usuario');

//Esto esta protegiendo todo el dominio
//app.use('/api', expressJwt({secret: secret}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride());

var router = express.Router();
var despacho = express.Router();
var ruta = express.Router();
var usuario = express.Router();

/*app.use(function(err, req, res, next){
  if (err.constructor.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized');
  }
});*/

app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', config.url.app);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    //res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.get('/api/restricted', function (req, res) {
  console.log('user ' + req.user.email + ' is calling /api/restricted');
  res.json({
    name: 'foo'
  });
});

despacho.route('/despacho')
    .get(DespachoCtrl.findAllDespachos)
    .post(DespachoCtrl.addDespacho);

despacho.route('/despacho/:id')
    .put(DespachoCtrl.updateDespacho)
    .delete(DespachoCtrl.deleteDespacho);
    
despacho.route('/despacho/:despacho')    

ruta.route('/ruta')
    .get(RutaCtrl.findAllRutas)
    .post(RutaCtrl.addRuta);

ruta.route('/ruta/:id')
    .get(RutaCtrl.findDespachos)
    .put(RutaCtrl.updateRuta)
    .delete(RutaCtrl.deleteRuta);   
    
usuario.route('/usuario')
    .get(UsuarioCtrl.findAllUsuarios)
    .post(UsuarioCtrl.addUsuario);

usuario.route('/usuario/:id')
    .get(UsuarioCtrl.findRutas);
    
usuario.route('/usuario/:username/:password')
    .put(UsuarioCtrl.updateUsuario)
    .delete(UsuarioCtrl.deleteUsuario)
    .post(UsuarioCtrl.authenticate);  

router.get('/', function (req, res) {
    res.send("App Camiones Index");
});

app.use('/api', despacho);
app.use('/api', ruta);
app.use('/api', usuario);
app.use(router);

mongoose.connect(config.url.mongo, function (err, res) {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    }
    app.listen(config.port, function () {
        console.log("Node server running on http://localhost:" + config.port);
    });
});
