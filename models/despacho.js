/*jslint node:true, es5:true */
'use strict';
const mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

const despachoSchema = new Schema({
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
        }
    });

module.exports = mongoose.model('Despacho', despachoSchema);
