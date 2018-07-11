const request = require('request');
const readline = require('readline-sync');

function getPostCode() {
    console.log("Please enter a Postcode");
    const raw = readline.prompt();
    return raw.trim().toUpperCase().replace(' ', '');
}

function getLongAndLat(myPostcode, callback) {
    const url = `http://api.postcodes.io/postcodes/${myPostcode}`;
    request(url , function (error, response, body) {
        if (error !== null) {
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
        } else if (error !== null) {
            console.log(error);
        } else {
            const rawPostcodeData = JSON.parse(body).result;
            const myLocation = [rawPostcodeData.longitude, rawPostcodeData.latitude];
            callback(myLocation)
        }
    });
}

exports.getPostCode = getPostCode;
exports.getLongAndLat = getLongAndLat;