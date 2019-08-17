const request = require('request')
const forecast = (lat, long, callback) => {
    const url = "https://api.darksky.net/forecast/704159b4c8ae5ee36550274a547a4215/" + lat + "," + long + "?units=si";
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            return callback("Unable to connect to weather services", undefined);
        } else if (body.code) {
            return callback(body.error, undefined);

        } else {
            return callback(undefined, body.currently.temperature);

        }
    })
}
module.exports = {
    forecast
}