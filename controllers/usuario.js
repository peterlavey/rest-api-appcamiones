/*jslint node:true, es5:true */
'use strict';

var mongoose = require('mongoose');
var Usuario = require('../models/usuario');
var jwt = require('jsonwebtoken');

/*exports.authenticate = function(req, res){
    console.log('authenticate');
    Usuario.count({'username':req.params.username}).exec(function(err, cantidad){
        if(cantidad){
            Usuario.findOne({'username':req.params.username}).exec(function(err, usuario){
                console.log('username request: '+req.params.username);
                if (err) {
                    console.log('Error 500');
                    res.status(500).send(err.message);
                    return;
                }else{
                    if (!(req.params.username === usuario.username && req.params.password === usuario.password)) {
                        res.status(401).send('Wrong user or password');
                        return;
                    }else{
                       var token = jwt.sign(usuario, 'jwtoken', { expiresIn: 60*5 });//5 minutos
                        res.json({ token: token });
                        console.log('Usuario inexistente');
                        res.status(401).send('Wrong user or password');
                        return; 
                    }   
                }  
            });
        }else{
            res.status(401).send('Wrong user or password');
            return;
        }
    });        
};*/

exports.authenticate = function(req, res){
    console.log('authenticate');
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
                console.info('Success!');
                var token = jwt.sign(usuario, 'jwtoken', { expiresIn: 60*5 });//5 minutos
                res.json({ token: token });
            } 
        }else{
            res.status(401).send('Wrong user or password');
            return;
        }
    });       
};

exports.findAllUsuarios = function (req, res) {
    Usuario.find(function (err, usuarios) {
        if (err) {
            res.send(500, err.message);
        }

        console.log('GET /findAllUsuarios');
        res.status(200).jsonp(usuarios);
    });
};

exports.addUsuario = function (req, res) {
    console.log('POST');
    console.log(req.body);

    var usuario = new Usuario({
        username: req.body.username,
        password: req.body.password,
        token: req.body.token,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        estado: req.body.estado,
        fechas: req.body.fechas,
        direccion: req.body.direccion
    });
    
    usuario.save(function (err, usuario) {
        if (err) {
            return res.status(500).send(err.message);
        }
        res.status(200).jsonp(usuario);
    });
};

exports.updateUsuario = function (req, res) {
    Usuario.findById(req.params.id, function (err, usuario) {
        console.log(req.body);
        usuario.username = req.body.username;
        usuario.password = req.body.password;
        usuario.token = req.body.token;
        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.estado = req.body.estado;
        usuario.fechas = req.body.fechas;
        usuario.direccion = req.body.direccion;


        usuario.save(function (err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).jsonp(usuario);
        });
    });
};

exports.deleteUsuario = function (req, res) {
    Usuario.findById(req.params.id, function (err, usuario) {
        usuario.remove(function (err) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.status(200).send();
        });
    });
};
