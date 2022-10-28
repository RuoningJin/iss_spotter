const request = require('request');

const fetchMyIP1 = function(callback) {
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

const fetchMyCo1 = (ipAddress, callback) => {
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

const fetchISSFlyOverTimes1 = function(coords, callback) {
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

const nextISSTimesForMyLocation1 = function(callback) {
  fetchMyIP1((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchMyCo1(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes1(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

module.exports = { fetchMyIP1, fetchMyCo1, fetchISSFlyOverTimes1, nextISSTimesForMyLocation1 };