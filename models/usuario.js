/*jslint node:true, es5:true */
'use strict';
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var usuarioSchema = new Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    token: {type: String},
    nombre:    { type: String },
    apellido:  { type: String },
    estado:     { type: Number },
    fechas: {
        creacion: {type: String},
        vigencia: {type: String}
    },
    direccion: {
        descripcion: {type: String},
        lat: {type: Number},
        lon: {type: Number}
    },
    rutas: [{type:ObjectId, ref:'Ruta'}]
});

module.exports = mongoose.model('Usuario', usuarioSchema);
