/*jslint node: true */
/*jslint unparam: true*/
'use strict';
var mongoose = require('mongoose'),
    Ruta = require('../models/ruta'),
    Despacho = require('../models/despacho');


mongoose.connect('mongodb://192.168.1.40/despacho', function (err, res) {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    }
    
    var ruta= new Ruta({
        nombre: "ruta2",
        descripcion: "descripcion de la ruta",
        estado: 1,
        fechas:{
            creacion: "2015-10-04",
            termino: ""
        },
        direccion:{
            ciudad: "Valparaiso",
            region: "Playa ancha",
            detalle: "Av.Libertador babasdas"
        },
        carga:{
            tipo: "Pescado",
            peso: 700
        },
        oferta: 2000000,
        empresa: {
            nombre: "Don Lucho",
            logo: "donlucho"
        }    
    });

    ruta.save();

    var despacho = new Despacho({
        nombre: "Cemento con ruta",
        descripcion: "una descarga",
        estado: 1,
        fechas:{
            entrega: "2015-10-04",
            real: ""
        },
        direccion:{
            descripcion: "algun lado",
            lat: -37.479868,
            lon: -79.599252
        },
        ruta:ruta._id
    });

    var despacho2 = new Despacho({
        nombre: "Otro despacho",
        descripcion: "una descarga",
        estado: 1,
        fechas:{
            entrega: "2015-10-04",
            real: ""
        },
        direccion:{
            descripcion: "algun lado",
            lat: -37.479868,
            lon: -79.599252
        },
        ruta:ruta._id
    });

    despacho.save();

    despacho2.save(function(error) {
        if (!error) {
            Despacho.find({}).populate('ruta').exec(function(error, despachos) {
                console.log(JSON.stringify(despachos, null, "\t"));
            });
        }
    });
});
