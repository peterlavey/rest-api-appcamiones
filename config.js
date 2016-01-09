/*jslint node:true*/
'use strict';
var config = {
    "peter": {
        "url": {
            "app": 'http://localhost:8100',
            "mongo": 'mongodb://192.168.1.40/despacho'
        },
        "port": 3000
    },
    "sex_bomb": {
        "url": {
            "app": 'http://localhost:8100',
            "mongo": 'mongodb://localhost/'
        },
        "port": 8080
    }
};
module.exports = function (options) {

    return config[options.env];
};
