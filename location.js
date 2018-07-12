const readline = require('readline-sync');
const apiRequest = require('./apiRequest');

function getPostCode() {
    console.log("Please enter a Postcode");
    const raw = readline.prompt();
    return raw.trim().toUpperCase().replace(' ', '');
}

function getLongAndLat(myPostcode) {
    const url = `http://api.postcodes.io/postcodes/${myPostcode}`;
    return apiRequest.apiRequest(url, "Failed to get longitude and latitude").then(function (rawData) {
            return [rawData.result.longitude, rawData.result.latitude];
    });
}

exports.getPostCode = getPostCode;
exports.getLongAndLat = getLongAndLat;