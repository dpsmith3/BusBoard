const request = require('request');

function apiRequest(url, errorMessage) {
    return new Promise( function (resolve, reject) {
        request(url, function (error, response, body) {
            if (response.statusCode !== 200) {
                reject(new Error(errorMessage));
            } else if (error !== null) {
                reject(new Error(error));
            } else {
                const rawData = JSON.parse(body);
                resolve(rawData);
            }
        })
    })
}

exports.apiRequest = apiRequest;