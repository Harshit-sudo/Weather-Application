const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('../forecast/forecasts.js')

const app = express()
console.log(__dirname)
console.log(__filename)
//
const pathDirectoryName = path.join(__dirname, '../src')
const templatePath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

hbs.registerPartials(partialsPath)

// folder we wanna serve up staticDirectory to serve
app.use(express.static(pathDirectoryName))

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', templatePath)




app.get('', (request, response) => {
    response.render('index', {
        title: 'Home',
        name: 'Harshit Srivastava'
    })
})

app.get('/about', (request, response) => {
    response.render('about', {
        title: 'About',
        name: "Harshit Srivastava"
    })
})

app.get('/weather', (request, response) => {
       if (!request.query.address) {
          return response.send({
               error: "Error! Please search something"
           }) 
}
  forecast(request.query.address, (error,{lat:latitude, lon:longitude} = {}, {main:view, description} = {}, {temp:temperature, pressure, humidity} = {}, {speed} = {}, name = "undefined") => {
       if (error) {
           return response.send({error: error})
       }
      return response.send({
            city:name,
            latitude:latitude,
            longitude: longitude, 
            temperature:temperature,
            description:description,
            view:view,
            
        })
    })
   
})

app.get('/about/*', (request, response) => {
    response.render('error', {
        name: "Help article not found"
    })
})
app.get('*', (request, response) => {

    response.render('error', {
        name: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is running')
})
