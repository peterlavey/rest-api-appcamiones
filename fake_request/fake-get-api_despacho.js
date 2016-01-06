/*jslint node: true */
/*jslint unparam: true*/
'use strict';

var request = require("request");

var payload = {};

var url = 'http://localhost:3000/api/despacho';

request.get({
    headers: {
        'content-type': 'application/json'
    },
    url: url,
    body: JSON.stringify(payload)
}, function (error, response, body) {
    console.log(body);
    console.log(error);
});
