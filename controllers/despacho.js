/*jslint node:true, es5:true */
'use strict';

//File: controllers/tvshows.js
var mongoose = require('mongoose');
var Despacho = require('../models/despacho');

//GET - Return all despachos in the DB
exports.findAllDespachos = function (req, res) {
    Despacho.find(function (err, despacho) {
        if (err) {
            res.send(500, err.message);
        }

        console.log('GET /despacho');
        res.status(200).jsonp(despacho);
    });
};

//GET - Return a despacho with specified ID
exports.findByRuta = function (req, res) {
    var query = Despacho.find({});
    query.where('ruta', req.params.ruta);
    query.exec(function (err, despacho) {
        if (err) {
            return res.send(500, err.message);
        }

        console.log('GET /despacho/' + req.params.ruta);
        res.status(200).jsonp(despacho);
    });
};

//POST - Insert a new despacho in the DB
exports.addDespacho = function (req, res) {
    console.log('POST');
    console.log(req.body);

    var despacho = new Despacho({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        fechas: req.body.fechas,
        direccion: req.body.direccion
    });

    despacho.save(function (err, despacho) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).jsonp(despacho);
    });
};

//PUT - Update a register already exists
exports.updateDespacho = function (req, res) {
    Despacho.findById(req.params.id, function (err, despacho) {
        console.log(req.body);
        despacho.nombre = req.body.nombre;
        despacho.descripcion = req.body.descripcion;
        despacho.estado = req.body.estado;
        despacho.fechas = req.body.fechas;
        despacho.direccion = req.body.direccion;

        despacho.save(function (err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).jsonp(despacho);
        });
    });
};

//DELETE - Delete a despacho with specified ID
exports.deleteDespacho = function (req, res) {
    Despacho.findById(req.params.id, function (err, despacho) {
        despacho.remove(function (err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).send();
        });
    });
};
