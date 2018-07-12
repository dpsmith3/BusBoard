const apiRequest = require('./apiRequest');

function getLongAndLat(myPostcode) {
    const url = `http://api.postcodes.io/postcodes/${myPostcode}`;
    return apiRequest.apiRequest(url, "Failed to get longitude and latitude").then(function (rawData) {
            return [rawData.result.longitude, rawData.result.latitude];
    });
}

exports.getLongAndLat = getLongAndLat;