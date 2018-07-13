var xhttp = new XMLHttpRequest();

xhttp.open('GET', 'http://localhost:3000/', true);

xhttp.setRequestHeader('Content-Type', 'application/json');

xhttp.onsubmit = function() {
    if (xhttp.status === 200) {
        console.log("SUCCESS. STATUS: ", xhttp.status);
        submittedPostcode = document.getElementById("submittedpostcode").value;
        document.getElementById("showPostcode").innerHTML = 'Submitted postcode: ' + submittedPostcode;
        xhttp.open('GET', `http://localhost:3000/departureBoards?postcode=${submittedPostcode}`, true);
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                const rawBusData = JSON.parse(xhttp.response);
                document.getElementById("resultsHeader").innerHTML = `Here are the next buses to arrive at the two nearest stops to ${submittedPostcode.toUpperCase()}`;

                //Loop to get two stops
                for (i = 1; i <= 2; i ++) {

                    document.getElementById(`stop${i}`).innerHTML = `${rawBusData[i-1].busStopCode}: ${rawBusData[i-1].busStopName}`;

                    //Inner loop to get next five buses
                    for (j = 1; j <= 5; j++) {
                        document.getElementById(`stop${i}bus${j}`).innerHTML = getBusDisplayLine(rawBusData, i, j);
                    }
                }
            }
        };
        xhttp.send();
    } else {
        console.log("ERROR during xhttp.onsubmit. STATUS: ", xhttp.status);
        alert("ERROR during xhttp.onsubmit. STATUS: ", xhttp.status);
    }
}

function getBusDisplayLine(rawBusData, stopNo, busNo) {
    const busRoute = rawBusData[stopNo - 1].nextFiveBuses[busNo - 1][0].lineId;
    const busDestination = rawBusData[stopNo - 1].nextFiveBuses[busNo - 1][0].destinationName;
    const time = getMinsAndSeconds(rawBusData[stopNo - 1].nextFiveBuses[busNo - 1][0].timeToStation);
    return `${busRoute} to ${busDestination} in ${time}`;
}

function getMinsAndSeconds(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return `${minutes} minutes and ${seconds} seconds.`
}

xhttp.send();