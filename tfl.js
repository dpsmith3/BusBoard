const apiRequest = require('./apiRequest');
const tflUrlBase = 'https://api.tfl.gov.uk/';
const appID = 'fc74bda1';
const appKey = 'e49db77088e0f0288fcb620712571331';

function getStopCodes(myLocation) {
    const long = myLocation[0];
    const lat = myLocation[1];
    const url = `${tflUrlBase}Place?type=NaptanOnstreetBusCoachStopPair&lat=${lat}&lon=${long}&radius=200&app_id=${appID}&app_key=${appKey}`;
    return apiRequest.apiRequest(url, "Failed to get stop codes").then(function (rawData) {
            const stopPoints = rawData["places"];
            return [
                stopPoints[0]["lineGroup"][0]["naptanIdReference"],
                stopPoints[0]["lineGroup"][1]["naptanIdReference"]
                ];
    })
}

function getNextFiveBusArrivals(busStopCode) {
    const url = `${tflUrlBase}StopPoint/${busStopCode}/Arrivals?app_id=${appID}&app_key=${appKey}`;
    return apiRequest.apiRequest(url, "Failed to print next five bus arrivals").then(function (rawData) {
        const sortedData = rawData.sort((a, b) => (a.timeToStation - b.timeToStation));
        return { busStopCode: busStopCode,
            nextFiveBuses: sortedData.slice(0,5).map(elem => [{
                lineId: elem.lineId,
                destinationName: elem.destinationName,
                timeToStation: elem.timeToStation
            }])
        };
    });
}

module.exports = {getStopCodes, getNextFiveBusArrivals};