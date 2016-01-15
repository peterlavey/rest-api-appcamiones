/*jslint node:true, es5:true */
'use strict';

var mongoose = require('mongoose');
var Usuario = require('../models/usuario');
var Ruta = require('../models/ruta');
var jwt = require('jsonwebtoken');

exports.authenticate = function(req, res){
    console.log("authenticate...");
    Usuario.findOne({'username':req.params.username}).exec(function(err, usuario){
        if (err) {
            console.log('Error 500');
            res.status(500).send(err.message);
            return;
        } 
        
        if(usuario){
           if (!(req.params.username === usuario.username && req.params.password === usuario.password)) {
                res.status(401).send('Wrong user or password');
                return;
            }else{
                console.log("authenticate - success!");
                var token = jwt.sign(usuario, 'jwtoken', { expiresIn: 60*5 });//5 minutos
                res.json({ token: token, usuario: usuario });
            } 
        }else{
            res.status(401).send('Wrong user or password');
            return;
        }
    });       
};

exports.findAllUsuarios = function (req, res) {
    Usuario.find(function (err, usuarios) {
        console.log("findAllUsuarios...");
        if (err) {
            res.send(500, err.message);
        }

        console.log("findAllUsuarios - success!");
        res.status(200).jsonp(usuarios);
    });
};

exports.findRutas = function (req, res) {
    Usuario.findById(req.params.id).populate('rutas').exec(function(err, usuario){
        console.log("findRutas...");
        if (err) {
            return  res.status(500).send(err.usuario);
        }
        
        var idRuta = 0;
        
        usuario.rutas.filter(function(ruta){
            //1:Estado activo, 2:Estado Terminado
           if(ruta.estado === 1){
               idRuta = ruta._id;
           } 
        });

        Ruta.findById(idRuta).populate('despachos').exec(function(err, ruta){      
            if (err) {
                return res.status(500).send(err.ruta);
            }
            console.log("findRutas - success!");
            res.status(200).jsonp(ruta.despachos);
        });      
    });
};

exports.addUsuario = function (req, res) {
    console.log("addUsuario...");

    var usuario = new Usuario({
        username: req.body.username,
        password: req.body.password,
        token: req.body.token,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        estado: req.body.estado,
        fechas: req.body.fechas,
        direccion: req.body.direccion,
        rutas: req.body.rutas
    });
    
    usuario.save(function (err, usuario) {
        if (err) {
            return res.status(500).send(err.message);
        }
        console.log("addUsuario - success!");
        res.status(200).jsonp(usuario);
    });
};

exports.updateUsuario = function (req, res) {
    Usuario.findById(req.params.id, function (err, usuario) {
        console.log("updateUsuario...");
        usuario.username = req.body.username;
        usuario.password = req.body.password;
        usuario.token = req.body.token;
        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.estado = req.body.estado;
        usuario.fechas = req.body.fechas;
        usuario.direccion = req.body.direccion;
        usuario.rutas = req.body.rutas;

        usuario.save(function (err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            console.log("updateUsuario - success!");
            res.status(200).jsonp(usuario);
        });
    });
};

exports.deleteUsuario = function (req, res) {
    Usuario.findById(req.params.id, function (err, usuario) {
        console.log("deleteUsuario...");
        usuario.remove(function (err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            console.log("deleteUsuario - success!");
            res.status(200).send();
        });
    });
};
