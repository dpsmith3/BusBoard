const readline = require('readline-sync');
const APIrequest = require('./APIrequest');

function getPostCode() {
    console.log("Please enter a Postcode");
    const raw = readline.prompt();
    return raw.trim().toUpperCase().replace(' ', '');
}

function getLongAndLat(myPostcode, callback) {
    const url = `http://api.postcodes.io/postcodes/${myPostcode}`;
    APIrequest.apiRequest(url, "Failed to get longitude and latitude", function (rawData) {
            const myLocation = [rawData.result.longitude, rawData.result.latitude];
            callback(myLocation);
        }
    )

}

exports.getPostCode = getPostCode;
exports.getLongAndLat = getLongAndLat;