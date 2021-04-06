//don't remove, fixed line 6 "[ts] Cannot redeclare block-scoped variable 'name'" error for unknown reasons
export {};

const where = require('node-where')

const location = (req, res, next) => {
    where.is(req.ip, function (err, result) {
        if (result) {
            const cityName = result.get('city')
            console.log(cityName)
            const stateName = result.get('region')
            const zipCode = result.get('\n postalCode')
            const adress = `${cityName}, ${stateName}, ${zipCode}`
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