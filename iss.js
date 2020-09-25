const request = require('request');

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIp((error, ip) => {
    if (error) {
      return callback(error, null);
    }
    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null, passes);
  };

  const fetchCoordsByIp = function (callback) {
    request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }
      if (response.statusCode !== 200) {
        callback(error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
        return;
      }
      const { latitude, longitude } = JSON.parse(body).data;
      callback(null, { latitude, longitude });
    });
  };

  const fetchMyIP = function (callback) {
    request('https://api.ipify.org?format=json', (error, response, body) => {
      if (error) return callback(error, null);

      if (response.statusCode !== 200) {
        callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);
        return;
      }

      const ip = JSON.parse(body).ip;
      callback(null, ip);
    });
  };

  module.exports = { nextISSTimesForMyLocation };