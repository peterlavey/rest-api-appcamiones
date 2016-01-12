/*jslint node:true, es5:true */
'use strict';
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var despachoSchema = new Schema({
        nombre:    { type: String },
        descripcion:  { type: String },
        estado:     { type: Number },
        fechas: {
            entrega: {type: String},
            real: {type: String}
        },
        direccion: {
            descripcion: {type: String},
            lat: {type: Number},
            lon: {type: Number}
        },
        ruta:{type:ObjectId, ref:'Ruta'}
    });

module.exports = mongoose.model('Despacho', despachoSchema);
