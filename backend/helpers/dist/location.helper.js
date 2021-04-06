"use strict";
exports.__esModule = true;
var where = require('node-where');
var location = function (req, res, next) {
    where.is(req.ip, function (err, result) {
        if (result) {
            var cityName = result.get('city');
            console.log(cityName);
            var stateName = result.get('region');
            var zipCode = result.get('\n postalCode');
            var adress = cityName + ", " + stateName + ", " + zipCode;
            req.geoip = adress;
        }
        if (err) {
            res.status(500).send(err.message ? err.message : 'location error');
            next(err);
        }
        next();
    });
};
module.exports = location;
