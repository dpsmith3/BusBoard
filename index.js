const tfl = require('./tfl');
const location = require('./location');

//Main
location.getLongAndLat(location.getPostCode()).then(function (myLocation) {
    tfl.getStopCodes(myLocation).then(function (twoNearestStops) {
        for (stop of twoNearestStops) {
            tfl.getNextFiveBusArrivals(stop).then(function (busArrivalData) {
                console.log(busArrivalData);
            });
        }
    });
});