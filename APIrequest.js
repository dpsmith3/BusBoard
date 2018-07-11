const request = require('request');

function apiRequest(url, errorMessage, callback) {
    request(url, function (error, response, body) {
        // Check if there is an error, report it
        if (response.statusCode === 404) {
            console.log(`${errorMessage}`);
        } else if (error !== null) {
            console.log(error);
        } else {
            // Extract raw data from body and callback
            const rawData = JSON.parse(body);
            callback(rawData);
        }
    })
}

exports.apiRequest = apiRequest;