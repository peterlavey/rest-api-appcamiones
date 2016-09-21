/*jslint node:true, es5:true */
'use strict';

const minimist = require('minimist'),
  expressJwt = require('express-jwt'),
  jwt = require('jsonwebtoken'),
  secret = 'secret123456',
  port=Number(process.env.PORT || 3001),
  express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  http = require("http"),
  server = http.createServer(app),
  mongoose = require('mongoose');

//Models
const DespachoCtrl = require('./controllers/despacho');
const RutaCtrl = require('./controllers/ruta');
const UsuarioCtrl = require('./controllers/usuario');

//Esto esta protegiendo todo el dominio
//app.use('/api', expressJwt({secret: secret}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(methodOverride());

const router = express.Router();
const despacho = express.Router();
const ruta = express.Router();
const usuario = express.Router();

/*app.use(function(err, req, res, next){
  if (err.constructor.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized');
  }
});*/

app.use((req, res, next)=> {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8100');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

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

app.get('/api/restricted', (req, res)=> res.json({name: 'foo'}));

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
    .get(RutaCtrl.findRutas)
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

router.get('/', (req, res) => res.send("App Camiones Index"));

app.use('/api', despacho);
app.use('/api', ruta);
app.use('/api', usuario);
app.use(router);

mongoose.connect('mongodb://peter:peter2712@ds058048.mongolab.com:58048/despacho', (err, res) =>{
    if (err) console.log('ERROR: connecting to Database. ' + err);
    app.listen(port, ()=> console.log("Node server running on http://localhost:" + port));
});
