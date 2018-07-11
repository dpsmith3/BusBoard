
const tfl = require('./tfl');
const location = require('./location');

//Main
const myPostcode = location.getPostCode();
location.getLongAndLat(myPostcode, function(myLocation) {
    tfl.getStopCodes(myLocation, function(twoNearestStops) {
        for (stop of twoNearestStops) {
            tfl.printNextFiveBusArrivals(stop);
        }
    });
});