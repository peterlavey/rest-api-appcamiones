/*jslint node:true, es5:true */
'use strict';

//File: controllers/tvshows.js
var mongoose = require('mongoose');
var Ruta = require('../models/ruta');

//GET - Return all despachos in the DB
exports.findAllRutas = function (req, res) {
    Ruta.find(function (err, ruta) {
        if (err) {
            res.send(500, err.message);
        }

        console.log('GET /ruta');
        res.status(200).jsonp(ruta);
    });
};

//GET - Return a ruta with specified ID
exports.findDespachos = function (req, res) {
    console.log(req.params);
    Ruta.find({'_id':req.params.id}).populate('despachos').exec(function(err, despachos){
        if (err) {
            return res.send(500, err.message);
        }
        console.log('GET /despacho/' + despachos);
        res.status(200).jsonp(despachos);
    });
   /*var query = Ruta.find({});
    query.where('ruta', req.params.ruta);
    query.exec(function (err, despacho) {
        if (err) {
            return res.send(500, err.message);
        }

        console.log('GET /despacho/' + req.params.ruta);
        res.status(200).jsonp(despacho);
    });
     Despacho.find({'ruta':req.params.ruta}, function(err, despacho){
         if (err) {
            return res.send(500, err.message);
        }
        
        console.log('GET /despacho/' + req.params.ruta);
        res.status(200).jsonp(despacho);
    });*/
};

//POST - Insert a new ruta in the DB
exports.addRuta = function (req, res) {
    console.log('POST');
    console.log(req.body);

    var ruta = new Ruta({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        fechas: req.body.fechas,
        direccion: req.body.direccion,
        carga: req.body.carga,
        oferta: req.body.oferta,
        empresa: req.body.empresa,
        despachos:req.body.despachos
    });

    ruta.save(function (err, ruta) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).jsonp(ruta);
    });
};

//PUT - Update a register already exists
exports.updateRuta = function (req, res) {
    Ruta.findById(req.params.id, function (err, ruta) {
        console.log(req.body);
        ruta.nombre = req.body.nombre;
        ruta.descripcion = req.body.descripcion;
        ruta.estado = req.body.estado;
        ruta.fechas = req.body.fechas;
        ruta.direccion = req.body.direccion;
        ruta.carga = req.body.carga;
        ruta.oferta = req.body.oferta;
        ruta.empresa = req.body.empresa;
        ruta.despachos = req.body.despachos;

        ruta.save(function (err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).jsonp(ruta);
        });
    });
};

//DELETE - Delete a ruta with specified ID
exports.deleteRuta = function (req, res) {
    Ruta.findById(req.params.id, function (err, ruta) {
        ruta.remove(function (err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).send();
        });
    });
};
