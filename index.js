const request = require('request');
const readline = require('readline-sync');

function getBusStopCode() {
    console.log("Please enter a bus stop code (eg. 490008660N)");
    return readline.prompt();
}

function getMinsAndSeconds(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    return `${minutes} minutes and ${seconds} seconds.`
}

function getCurrentStopData(busStopCode) {
    const url = `https://api.tfl.gov.uk/StopPoint/${busStopCode}/Arrivals?app_id=fc74bda1&app_key=e49db77088e0f0288fcb620712571331`;

    request(url, function (error, response, body) {
        // 1. Check if there is an error, report it
        if (response.statusCode === 404) {
            console.log(response.statusCode);
            console.log(error);
        } else {

            // 2. Extract data from body
            const rawData = JSON.parse(body);

            const sortedData = rawData.sort(function compare(a, b) {
                if (a.timeToStation < b.timeToStation) {
                    return -1;
                }
                if (a.timeToStation > b.timeToStation) {
                    return 1;
                }
                return 0;
            });

            // 3. Display it
            for (let bus of sortedData.slice(0, 5)) {
                console.log(`The next five buses will be: ${sortedData.indexOf(bus) + 1}: ${bus.lineId} to ${bus.destinationName}, in ${getMinsAndSeconds(bus.timeToStation)}`);
            }
        }
    });
}

//Main
const busStopCode = getBusStopCode()
getCurrentStopData(busStopCode);
