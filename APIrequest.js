const request = require('request');

function apiRequest(url, errorMessage) {
    return new Promise( function (resolve, reject) {
        request(url, function (error, response, body) {
            if (response.statusCode !== 200) {
                reject(console.log(`${errorMessage}`));
            } else if (error !== null) {
                reject(console.log(error));
            } else {
                const rawData = JSON.parse(body);
                resolve(rawData);
            }
        })
    })
}

exports.apiRequest = apiRequest;