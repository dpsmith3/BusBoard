const tfl = require('./tfl');
const location = require('./location');

//Main
location.getLongAndLat(location.getPostCode())
    .then(myLocation => tfl.getStopCodes(myLocation))
    .then(twoNearestStops => {
        return Promise.all(twoNearestStops.map(stop => tfl.getNextFiveBusArrivals(stop)))
    })
    .then((values) => {
        for (let element of values) {
            console.log(element)
        }
    })
    .catch(error => console.log(error));
