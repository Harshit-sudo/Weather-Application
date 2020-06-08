const axios = require('axios')
// 
const forecast = (city = "Lucknow", callback) => {

const url = 'https://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid=cf0593eb0fa1722fba383d2b234f883a&units=metric'

axios.get(url)
.then((response) => {
    if (response.data.error) {
        callback(true)
    } else {
        const {coord, weather,main, wind, name} = response.data
        callback(false, coord, weather[0], main, wind, name)
    }
})
.catch((error) => {
   callback(true)
})

}

// forecast(city, ({lat:latitude, lon:longitude}, {main:view, description}, {temp:temperature, pressure, humidity}, {speed}, name) => {
//     console.log('latitude', latitude)
//      console.log('longitude', longitude)
//      console.log('view', view)
//      console.log('description', description)
//      console.log('temperature', temperature)
//      console.log('pressure', pressure)
//      console.log('humidity', humidity)
//      console.log('speed', speed)
// })

// forecast('Lucknow', (coord, weather,main, wind, name) => {
//  const {lat: latitude, lon: longitude} = coord
//  const {main:view,description} = weather[0]
//  const {temp, pressure, humidity} = main
//  const {speed} = wind
//  console.log(name)
//  console.log('latitude', latitude)
//  console.log('longitude', longitude)
//  console.log('view', view)
//  console.log('description', description)
//  console.log('temperature', temp)
//  console.log('pressure', pressure)
//  console.log('humidity', humidity)
//  console.log('speed', speed)
// })

module.exports = forecast