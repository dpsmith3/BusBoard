const request = require('request');

function getMinsAndSeconds(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return `${minutes} minutes and ${seconds} seconds.`
}

function getStopCodes(myLocation, callback) {
    const long = myLocation[0];
    const lat = myLocation[1];
    const url = `https://api.tfl.gov.uk/Place?type=NaptanOnstreetBusCoachStopPair&lat=${lat}&lon=${long}&radius=200`;
    request(url, function (error, response, body) {
        // Check if there is an error, report it
        if (response.statusCode === 404) {
            console.log(`Failed to get stopCode. Status code was ${response.statusCode}.`);
        } else if (error !== null) {
            console.log(error);
        }
            {
            const rawData = JSON.parse(body);
            const stopPoints = rawData["places"];
            const twoNearestStops = [
                stopPoints[0]["lineGroup"][0]["naptanIdReference"],
                stopPoints[0]["lineGroup"][1]["naptanIdReference"]
            ];
            callback(twoNearestStops);
        }
    })
}

function printNextFiveBusArrivals(busStopCode) {
    const url = `https://api.tfl.gov.uk/StopPoint/${busStopCode}/Arrivals?app_id=fc74bda1&app_key=e49db77088e0f0288fcb620712571331`;

    request(url, function (error, response, body) {
        // Check if there is an error, report it
        if (response.statusCode === 404) {
            console.log(`Failed to print next five bus arrivals correctly using busStopCode ${busStopCode}. Status code was ${response.statusCode}`)
        } else if (error !== null) {
            console.log(error);
        }else {
            // Extract data from body
            const rawData = JSON.parse(body);
            const sortedData = rawData.sort((a, b) => (a.timeToStation - b.timeToStation));
            // Display it
            console.log(`\nThe next five buses at bus stop ${busStopCode} will be:`);
            for (let bus of sortedData.slice(0, 5)) {
                console.log(`${sortedData.indexOf(bus) + 1}: ${bus.lineId} to ${bus.destinationName}, in ${getMinsAndSeconds(bus.timeToStation)}`);
            }
        }
    })
}

exports.getStopCodes = getStopCodes;
exports.printNextFiveBusArrivals = printNextFiveBusArrivals;