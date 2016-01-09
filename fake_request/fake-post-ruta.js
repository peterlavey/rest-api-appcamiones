/*jslint node: true */
/*jslint unparam: true*/
'use strict';

var request = require("request");

var payload = {
    nombre: "ruta2",
    descripcion: "descripcion de la ruta",
    estado: 1,
    fechas:{
        creacion: "2015-10-04",
        termino: ""
    },
    direccion:{
        ciudad: "Valparaiso",
        region: "Playa ancha",
        detalle: "Av.Libertador babasdas"
    },
    carga:{
    	tipo: "Pescado",
    	peso: 700
    },
    oferta: 2000000,
    empresa: {
    	nombre: "Don Lucho",
    	logo: "donlucho"
    }
};

var url = 'http://localhost:3000/api/ruta';

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
