/*jslint node:true*/
/*jslint unparam:true*/
'use strict';
var mongoose = require('mongoose'),
    Despacho = require('./models/despacho');


mongoose.connect('mongodb://192.168.1.39/despacho', function (err, res) {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    }

    var despacho = new Despacho({
        nombre: "Mi despacho",
        descripcion: "Un despacho amplio y lindo",
        estado: 1,
        fechas: {
            entrega: "2015-10-04",
            real: ""
        },
        direccion: {
            descripcion: "Cajas con pescado",
            lat: -33.479868,
            lon: -70.599252
        }
    });

    despacho.save(function (err, despacho) {
        Despacho.find({}, function (err, despachos) {
            console.info(despachos);
        });
    });
});
