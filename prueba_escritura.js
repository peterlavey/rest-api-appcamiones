/*jslint node:true*/
/*jslint unparam:true*/
'use strict';
var mongoose = require('mongoose'),
    Ruta = require('./models/ruta'),
    Despacho = require('./models/despacho');


mongoose.connect('mongodb://192.168.1.40/despacho', function (err, res) {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    }

    var ruta = new Ruta({
        nombre: "Cementos",
        descripcion: "carga de cementos",
        estado: 1,
        fechas: {
            creacion: "2015-10-05",
            termino: ""
        },
        direccion: {
            ciudad: "Santiago",
            region: "Quinta normal",
            detalle: "Las lilas"
        },
        carga: {
            tipo: "Cemento",
            peso: 800
        },
        oferta: 1700000,
        empresa: {
            nombre: "Polpaico",
            logo: "polpaico"
        }
    });

    var despacho = new Despacho({
        nombre: "Mi despacho",
        descripcion: "Un despacho amplio y lindo",
        estado: 1
    });
    
    var cb = function() {
        var despachos = Despacho.find({}, function(err, data){
            console.info(data);
        });
        var rutas = Ruta.find({}, function(err, data){
            console.info(data);
        });
    };
    var done = function() {
        done.executed +=1;
        
        if(done.executed === 2) {
            cb();
        }
    };
    done.executed = 0;
    
    ruta.save(done);

    despacho.save(done);
});
