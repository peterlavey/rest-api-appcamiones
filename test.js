/*jslint node:true*/
/*jslint unparam:true*/
'use strict';
let mongoose = require('mongoose'),
    Despacho = require('./models/despacho');


mongoose.connect('mongodb://192.168.1.39/despacho', (err, res)=>{
    if (err) console.log('ERROR: connecting to Database. ' + err);

    let despacho = new Despacho({
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

    despacho.save((err, despacho)=> Despacho.find({}, (err, despachos)=> console.info(despachos)));
});
