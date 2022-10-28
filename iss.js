const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const object = JSON.parse(body);
    const ip = object.ip;
    if (!body) {
      return null;
    }
    return callback(null, ip);
  });
};


const fetchMyCo = (ipAddress, callback) => {
  request(`http://ipwho.is/${ipAddress}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const object = JSON.parse(body);
    const { latitude, longitude } = object;
    
    if (object.success === false) {
      return callback(Error(`Success status was ${object.success}. Server message says: ${object.message} when fetching for IP ${object.ip}`), null);
    }

    return callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {
      return callback(Error(`Status code ${response.statusCode} when fetching Response: ${body}`), null);
    }

    const object = JSON.parse(body);
    return callback(null, object.response);
  });
  // ...
};

const nextISSTimesForMyLocation = function(results, callback) {
  for (const result of results) {

    if (!results) {
      return callback(null, null);
    }

    const message = `Next pass at ${new Date(Number(result.risetime + '000'))} for ${result.duration} seconds!`;
    callback(null, message);
  }
  return;
};

module.exports = { fetchMyIP, fetchMyCo, fetchISSFlyOverTimes, nextISSTimesForMyLocation };