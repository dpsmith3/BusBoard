const express = require('express');
const tfl = require('./tfl');
const location = require('./location');
const app = express();

function getBusArrivalsFromPostcode(postcode) {
    return location.getLongAndLat(postcode)
        .then(myLocation => tfl.getStopCodes(myLocation))
        .then(twoNearestStops => Promise.all(twoNearestStops.map(stop => tfl.getNextFiveBusArrivals(stop))))
        .then(busArrivals => busArrivals);
}

// User must visit URL http://localhost:3000/busarrivals/?postcode=    and enter the desired postcode at the end.
app.get('/busarrivals', (req, res) => {
    const postcode = req.query.postcode;
    console.log("postcode: ", postcode);
    getBusArrivalsFromPostcode(postcode)
        .then((busJSON) => res.status('200').send(busJSON))
        .catch((error) => {
            console.log(error);
            res.status('500').send("Error when getting bus arrivals from postcode");
        })
});

app.listen(3000, () => console.log('App listening on port 3000!'));