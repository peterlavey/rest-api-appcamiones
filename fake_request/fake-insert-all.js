/*jslint node: true */
/*jslint unparam: true*/
'use strict';
let mongoose = require('mongoose'),
    Usuario = require('../models/usuario'),
    Ruta = require('../models/ruta'),
    Despacho = require('../models/despacho');


mongoose.connect('mongodb://peter:peter2712@ds058048.mongolab.com:58048/despacho', (err, res)=> if (err) console.log('ERROR: connecting to Database. ' + err);
    Despacho.remove({}, (err,removed) =>{
        if (!err) {
            Ruta.remove({}, (err,removed)=>{
                if (!err) {
                    Usuario.remove({}, (err,removed) =>{
                        if (!err) {
                            console.log("Remove all!");
                             let despacho = new Despacho({
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

                            let despacho2 = new Despacho({
                                nombre: "bbbbbb",
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

                            let despacho3 = new Despacho({
                                nombre: "despacho 3",
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
                            despacho2.save();
                            despacho3.save();

                            let ruta= new Ruta({
                                nombre: "Rutita",
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
                                },
                                despachos: [despacho._id, despacho2._id]
                            });

                            let ruta2= new Ruta({
                                nombre: "Rutota",
                                descripcion: "descripcion de la ruta",
                                estado: 2,
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
                                },
                                despachos: [despacho3._id]
                            });

                            ruta.save();
                            ruta2.save();

                            let usuario = new Usuario({
                                username: "admin",
                                password: "123",
                                rutas: [ruta._id, ruta2._id]
                            });

                            usuario.save((error)=> if (!error) console.log("Data created!"));
                        }
                    })
                }
            })
        }
    });
});
