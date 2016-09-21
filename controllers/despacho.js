/*jslint node:true, es5:true */
'use strict';

const mongoose = require('mongoose');
const Despacho = require('../models/despacho');

//GET - Return all despachos in the DB
exports.findAllDespachos = (req, res)=>{
    Despacho.find((err, despacho)=> {
      if (err) res.send(500, err.message);
      res.status(200).jsonp(despacho);
    });
};

//GET - Return a despacho with specified ID
exports.findByRuta = (req, res)=> {
    let query = Despacho.find({});
    query.where('ruta', req.params.ruta);
    query.exec((err, despacho)=> {
        if (err) return res.send(500, err.message);
        res.status(200).jsonp(despacho);
    });
};

//POST - Insert a new despacho in the DB
exports.addDespacho = (req, res)=> {
    let despacho = new Despacho({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        fechas: req.body.fechas,
        direccion: req.body.direccion,
        ruta:req.body.ruta
    });

    despacho.save((err, despacho)=> {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(despacho);
    });
};

//PUT - Update a register already exists
exports.updateDespacho = (req, res)=> {
    Despacho.findById(req.params.id, (err, despacho)=> {
        despacho.nombre = req.body.nombre;
        despacho.descripcion = req.body.descripcion;
        despacho.estado = req.body.estado;
        despacho.fechas = req.body.fechas;
        despacho.direccion = req.body.direccion;
        despacho.ruta = req.body.ruta;

        despacho.save((err)=> {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(despacho);
        });
    });
};

//DELETE - Delete a despacho with specified ID
exports.deleteDespacho = (req, res)=> {
    Despacho.findById(req.params.id, (err, despacho)=> {
        despacho.remove((err)=> {
            if (err) return res.status(500).send(err.message);
            res.status(200).send();
        });
    });
};
