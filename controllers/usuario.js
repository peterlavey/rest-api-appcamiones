/*jslint node:true, es5:true */
'use strict';

const mongoose = require('mongoose');
const Usuario = require('../models/usuario');
const Ruta = require('../models/ruta');
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res)=>{
    console.log("authenticate...");
    Usuario.findOne({'username':req.params.username}).exec((err, usuario)=>{
        if (err) {
            res.status(500).send(err.message);
            return;
        }

        if(usuario){
           if (!(req.params.username === usuario.username && req.params.password === usuario.password)) {
                res.status(401).send('Wrong user or password');
                return;
            }else{
                console.log("authenticate - success!");
                let token = jwt.sign(usuario, 'jwtoken', { expiresIn: 60*5 });//5 minutos
                res.json({ token: token, usuario: usuario });
            }
        }else{
            res.status(401).send('Wrong user or password');
            return;
        }
    });
};

exports.findAllUsuarios = (req, res)=> {
    Usuario.find((err, usuarios)=> {
        if (err) res.send(500, err.message);
        res.status(200).jsonp(usuarios);
    });
};

exports.findRutas = (req, res)=> {
    Usuario.findById(req.params.id).populate('rutas').exec((err, usuario)=> {
        if (err) return  res.status(500).send(err.usuario);
        let idRuta = 0;

        usuario.rutas.filter((ruta)=> {
          if(ruta.estado === 1) idRuta = ruta._id;
        });
        Ruta.findById(idRuta).populate('despachos').exec((err, ruta)=> {
            if (err) return res.status(500).send(err.ruta);
            res.status(200).jsonp(ruta.despachos);
        });
    });
};

exports.addUsuario = (req, res)=> {
    let usuario = new Usuario({
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

    usuario.save((err, usuario)=> {
        if (err) return res.status(500).send(err.message);
        res.status(200).jsonp(usuario);
    });
};

exports.updateUsuario = (req, res)=> {
    Usuario.findById(req.params.id, (err, usuario)=> {
        usuario.username = req.body.username;
        usuario.password = req.body.password;
        usuario.token = req.body.token;
        usuario.nombre = req.body.nombre;
        usuario.apellido = req.body.apellido;
        usuario.estado = req.body.estado;
        usuario.fechas = req.body.fechas;
        usuario.direccion = req.body.direccion;
        usuario.rutas = req.body.rutas;

        usuario.save((err)=> {
            if (err) return res.status(500).send(err.message);
            res.status(200).jsonp(usuario);
        });
    });
};

exports.deleteUsuario = (req, res)=> {
    Usuario.findById(req.params.id, (err, usuario)=> {
        usuario.remove(function (err) {
            if (err) return res.status(500).send(err.message);
            res.status(200).send();
        });
    });
};
