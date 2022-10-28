const { fetchMyIP, fetchMyCo, fetchISSFlyOverTimes, nextISSTimesForMyLocation } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  console.log('It worked! Returned IP:' , ip);

  fetchMyCo(ip, (error, coordinates) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
  
    console.log('It worked! Returned IP Cordinates:' , coordinates);

    fetchISSFlyOverTimes(coordinates, (error, result) => {
      if (error) {
        console.log("It didn't work!" , error);
        return;
      }
    
      console.log('It worked! Returned the fly over times:' , result);

      nextISSTimesForMyLocation(result, (error, passTimes) => {
        if (error) {
          return console.log("It didn't work!", error);
        }
        // success, print out the deets!
        console.log(passTimes);
      });
    });
  });
});


