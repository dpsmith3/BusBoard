const express = require('express');
const app = express();
const index = require('./index');
const postcode = "NW5 1TL";



index.getBusArrivalsFromPostcode(postcode, function(busInfo) {
    const body = busInfo;
    const status = 200;
    console.log("BODY: ", body);
    app.get('/busarrivals', (req, res) => {
        return res.status(`${status}`).send(body);
    });
    app.listen(3000, () => console.log('App listening on port 3000!'));
});