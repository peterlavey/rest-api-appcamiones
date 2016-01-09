/*jslint node:true*/
/*jslint unparam:true*/
'use strict';
var mongoose = require('mongoose'),
    Ruta = require('./models/ruta'),
    Despacho = require('./models/despacho');


mongoose.connect('mongodb://localhost/prefijo', function (err, res) {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    }

    var ruta = new Ruta({
        nombre: "ruta2",
        descripcion: "descripcion de la ruta",
        estado: 1,
        fechas: {
            creacion: "2015-10-04",
            termino: ""
        },
        direccion: {
            ciudad: "Valparaiso",
            region: "Playa ancha",
            detalle: "Av.Libertador babasdas"
        },
        carga: {
            tipo: "Pescado",
            peso: 700
        },
        oferta: 2000000,
        empresa: {
            nombre: "Don Lucho",
            logo: "donlucho"
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
