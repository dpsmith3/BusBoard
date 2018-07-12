const tfl = require('./tfl');
const location = require('./location');

//Main
function getBusArrivalsFromPostcode(postcode, callback) {
    location.getLongAndLat(postcode)
    .then(myLocation => tfl.getStopCodes(myLocation))
    .then(twoNearestStops => {
        return Promise.all(twoNearestStops.map(stop => tfl.getNextFiveBusArrivals(stop)))
    })
    .then((values) => {
        callback(values/*.join('\n')*/);
    })
    .catch(error => error);
}

exports.getBusArrivalsFromPostcode = getBusArrivalsFromPostcode;