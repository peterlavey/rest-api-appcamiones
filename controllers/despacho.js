/*jslint node:true, es5:true */
'use strict';

var mongoose = require('mongoose');
var Despacho = require('../models/despacho');

//GET - Return all despachos in the DB
exports.findAllDespachos = function (req, res) {
    Despacho.find(function (err, despacho) {
        console.log("findAllDespachos...");
        if (err) {
            res.send(500, err.message);
        }

        console.log("findAllDespachos - Success!");
        res.status(200).jsonp(despacho);
    });
};

//GET - Return a despacho with specified ID
exports.findByRuta = function (req, res) {
    console.log("findByRuta...");
    var query = Despacho.find({});
    query.where('ruta', req.params.ruta);
    query.exec(function (err, despacho) {
        if (err) {
            return res.send(500, err.message);
        }

        console.log("findByRuta - Success!");
        res.status(200).jsonp(despacho);
    });
};

//POST - Insert a new despacho in the DB
exports.addDespacho = function (req, res) {
    console.log("addDespacho...");

    var despacho = new Despacho({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        fechas: req.body.fechas,
        direccion: req.body.direccion,
        ruta:req.body.ruta
    });

    despacho.save(function (err, despacho) {
        if (err) {
            return res.status(500).send(err.message);
        }
        console.log("addDespacho - Success!");
        res.status(200).jsonp(despacho);
    });
};

//PUT - Update a register already exists
exports.updateDespacho = function (req, res) {
    Despacho.findById(req.params.id, function (err, despacho) {
        console.log("updateDespacho...");
        console.log(req.body);
        console.log("**********************");
        despacho.nombre = req.body.nombre;
        despacho.descripcion = req.body.descripcion;
        despacho.estado = req.body.estado;
        despacho.fechas = req.body.fechas;
        despacho.direccion = req.body.direccion;
        despacho.ruta = req.body.ruta;

        despacho.save(function (err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            console.log("updateDespacho - Success!");
            res.status(200).jsonp(despacho);
        });
    });
};

//DELETE - Delete a despacho with specified ID
exports.deleteDespacho = function (req, res) {
    Despacho.findById(req.params.id, function (err, despacho) {
        console.log("deleteDespacho...");
        despacho.remove(function (err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            console.log("deleteDespacho - Success!");
            res.status(200).send();
        });
    });
};
