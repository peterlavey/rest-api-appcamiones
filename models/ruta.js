    /*jslint node:true, es5:true */
'use strict';
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var rutaSchema = new Schema({
        nombre:    { type: String },
        descripcion:  { type: String },
        estado:     { type: Number },
        fechas: {
            creacion: {type: String},
            termino: {type: String}
        },
        direccion: {
            ciudad: {type: String},
            region: {type: String},
            detalle: {type:String}
        },
        carga:{
        	tipo: {type: String},
        	peso: {type: Number}
        },
        oferta: {type:Number},
        empresa: {
        	nombre: {type: String},
        	logo: {type: String}
        }
    });

module.exports = mongoose.model('Ruta', rutaSchema);
