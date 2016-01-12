/*jslint node: true */
/*jslint unparam: true*/
'use strict';

var request = require("request");

var payload = {
    nombre: "Cemento con ruta",
    descripcion: "una descarga",
    estado: 1,
    fechas:{
        entrega: "2015-10-04",
        real: ""
    },
    direccion:{
        descripcion: "algun lado",
        lat: -37.479868,
        lon: -79.599252
    },
    ruta:"5691bee6b45807a80c51542b"
};

var url = 'http://localhost:3000/api/despacho';

request.post({
    headers: {
        'content-type': 'application/json'
    },
    url: url,
    body: JSON.stringify(payload)
}, function (error, response, body) {
    console.log(body);
    console.log(error);
});
