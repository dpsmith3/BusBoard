const request = require('request');
const readline = require('readline-sync');

function getBusStopCode() {
    console.log("Please enter a bus stop code");
    return readline.prompt();
}
const busStopCode = '490008660N';

function getCurrentStopData(busStopCode) {
    const url = `https://api.tfl.gov.uk/StopPoint/${busStopCode}/Arrivals?app_id=fc74bda1&app_key=e49db77088e0f0288fcb620712571331`;

    request(url, function (error, response, body) {
        // 1. Check if there is an error, report it
        if (response.statusCode === 404) {
            console.log(response.statusCode);
            console.log(error);
        } else {

            // 2. Extract data from body
            const data = JSON.parse(body);

            // 3. Display it
            for (i = 1; i <= 5; i ++) {
                console.log(`${i}: ${data[i].lineId} to ${data[i].destinationName}, in ${data[i].timeToStation} seconds`);
            }
        }
    });

}


//Main
getCurrentStopData(busStopCode);

console.log("CHANGED THIS");