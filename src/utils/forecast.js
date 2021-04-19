const request = require('request')
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


const forecast = (longitude, latitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=4ae59416c81e2747322d8d9f1ba7aa1b&query=' + latitude + ',' + longitude + '&units=m'
  //console.log(url)

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather services!', undefined)
    } else if (body.error) {
      callback('Unable to find location! Try another search', undefined)
    } else {
      callback(undefined, body.current.weather_descriptions[0] + ". It's currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out."
      )
      //   console.log(response.body.forecast.weather_descriptions[0] + ". It'll be around " + response.body.forecast.avgtemp + " degrees out. And will be //around " + response.body.forecast.sunhour + " sunhours during the day.")
    }
  }
  )
}

module.exports = forecast


