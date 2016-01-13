/*jslint node: true */
/*jslint unparam: true*/
'use strict';
var mongoose = require('mongoose'),
    Usuario = require('../models/usuario');

mongoose.connect('mongodb://192.168.1.40/despacho', function (err, res) {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    }
    
    var usuario = new Usuario({
        username: "admin",
        password: "123"
    });

    usuario.save(function(error) {
        if (!error) {
            Usuario.find({}, function(err, data){
                console.info(data);
            });    
        }
    });
});
