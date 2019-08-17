const request = require('request')

const geo = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYXNocmFmbW9oYW1lZCIsImEiOiJjanpjMDh4bDQwMHl1M2NuNTFmZGZ5OHRwIn0.u-9IEN8gLHpAoavHZBcjuQ";
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("unable to connect to map services", undefined)
        } else if (body.message) {
            return callback("unable to find location", undefined)

        } else if (body.features.length === 0) {
            return callback("unable to find location", undefined)

        } else {
            return callback(undefined, {
                place: body.features[0].text,
                lat: body.features[0].geometry.coordinates[1],
                long: body.features[0].geometry.coordinates[0]
            })
        }
    })
}
module.exports = {
    geo
}