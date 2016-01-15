/*jslint node: true */
/*jslint unparam: true*/
'use strict';

var request = require("request");
var Despacho = require('../models/despacho');

var payload = {};

var despacho = new Despacho({
    nombre: "adsad",
    descripcion: "una descarga",
    estado: 1,
    fechas:{
        entrega: "2015-10-04",
        real: ""
    },
    direccion:{
        descripcion: "algun lado",
        lat: -33.3839493,
        lon: -70.6830232
    }
});

despacho.save();

despacho.estado=2;

var url = 'http://localhost:3000/api/despacho/'+despacho._id;

request.put({
    headers: {
        'content-type': 'application/json'
    },
    url: url,
    body: JSON.stringify(despacho)
}, function (error, response, body) {
    console.log(body);
    console.log(error);
});
