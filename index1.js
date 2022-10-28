const { fetchMyIP1, fetchMyCo1, fetchISSFlyOverTimes1, nextISSTimesForMyLocation1 } = require('./iss1');

fetchMyIP1((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);

});

fetchMyCo1('76.68.18.159', (error, coordinates) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP Cordinates:' , coordinates);
});

fetchISSFlyOverTimes1({ latitude: 45.3728084, longitude: -75.774182}, (error, result) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned the fly over times:' , result);
});


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation1((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});