const readline = require('readline-sync');
const APIrequest = require('./apiRequest');

function getPostCode() {
    console.log("Please enter a Postcode");
    const raw = readline.prompt();
    return raw.trim().toUpperCase().replace(' ', '');
}

function getLongAndLat(myPostcode) {
    const url = `http://api.postcodes.io/postcodes/${myPostcode}`;
    return APIrequest.apiRequest(url, "Failed to get longitude and latitude").then(function (rawData) {
            return [rawData.result.longitude, rawData.result.latitude];
    });
}

exports.getPostCode = getPostCode;
exports.getLongAndLat = getLongAndLat;