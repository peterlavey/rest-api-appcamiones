/*jslint node: true */
/*jslint unparam: true*/
'use strict';

let request = require("request");
let payload = {};
let url = 'http://localhost:3000/api/despacho';

request.get({
    headers: {
        'content-type': 'application/json'
    },
    url: url,
    body: JSON.stringify(payload)
}, (error, response, body) =>{
    console.log(body);
    console.log(error);
});
