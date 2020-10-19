const where = require('node-where')

const location = (req, res, next) => {
    where.is(req.ip, function (err, result) {
        if (result) {
            const cityName = result.get('city')
            console.log(cityName)
            const stateName = result.get('region')
            const zipCode = result.get('\n postalCode')
            const adress = cityName + stateName + zipCode
            req.geoip = adress
        }
        if (err) {
            res.status(500).send(err.message ? err.message : 'location error')
            next(err)
        }
        next()
    })
}

module.exports = location