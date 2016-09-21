/*jslint node:true, es5:true */
'use strict';

//File: controllers/tvshows.js
const mongoose = require('mongoose');
const Usuario = require('../models/usuario');
const Ruta = require('../models/ruta');

//GET - Return all despachos in the DB
exports.findAllRutas = (req, res)=> {
    Ruta.find((err, ruta)=> {
        if (err) res.send(500, err.message);
        res.status(200).jsonp(ruta);
    });
};

exports.findRutas = (req, res)=> {
    Usuario.findById(req.params.id).populate('rutas').exec((err, usuario)=> {
        if (err) return  res.status(500).send(err.usuario);
        res.status(200).jsonp(usuario.rutas);
    });
};

//POST - Insert a new ruta in the DB
exports.addRuta = (req, res)=> {
    let ruta = new Ruta({
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

    ruta.save((err, ruta)=> {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(ruta);
    });
};

//PUT - Update a register already exists
exports.updateRuta = (req, res)=> {
    Ruta.findById(req.params.id, (err, ruta)=> {
        ruta.nombre = req.body.nombre;
        ruta.descripcion = req.body.descripcion;
        ruta.estado = req.body.estado;
        ruta.fechas = req.body.fechas;
        ruta.direccion = req.body.direccion;
        ruta.carga = req.body.carga;
        ruta.oferta = req.body.oferta;
        ruta.empresa = req.body.empresa;
        ruta.despachos = req.body.despachos;

        ruta.save((err)=> {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(ruta);
        });
    });
};

//DELETE - Delete a ruta with specified ID
exports.deleteRuta = (req, res)=> {
    Ruta.findById(req.params.id, (err, ruta)=> {
        ruta.remove((err)=> {
            if (err) return res.status(500).send(err.message);
            res.status(200).send();
        });
    });
};
