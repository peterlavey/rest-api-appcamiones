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
    },
    "server": {
        "url": {
            "app": 'http://localhost:8100',
            "mongo": 'mongodb://peter:peter2712@ds058048.mongolab.com:58048/despacho'
        },
        "port": 3001
    },
    "work": {
        "url": {
            "app": 'http://localhost:8100',
            "mongo": 'mongodb://192.168.1.39/despacho'
        },
        "port": 3000
    }
};
module.exports = function (options) {

    return config[options.env];
};
