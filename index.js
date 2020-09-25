const { nextISSTimesForMyLocation } = require('./iss');

const printPassTimes = function (passtimes) {
  for (const pass of passTimes) {
    const dateTime = new Date(0);
    dateTime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass as ${datetime} for ${durations} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
});

printPassTimes(passTimes);

const coords = { latitude: '49.27670', longitude: '-123.13000' };

const fetchISSFlyOverTimes = (exampleCoords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  console.log('It worked! Returned flyover times:', passTimes);
});


// fetchCoordsByIP('162.245.144.188', (error, coords) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned Coords:', coords);
// });

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Returned IP:', ip);
// });