const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for Express config
const pulicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(pulicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title : 'Weather',
        author : 'Nym'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title : 'About',
        author : 'Nym'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title : 'Help',
        author : 'Nym',
        message : 'Help mee pleaseeeeeeee'
    })
})

app.get('/weather', (req,res) => {
    console.log(req.query)
    if(!req.query.address) {
        return res.send({
            error : 'must include address'
        })
    }
    geoCode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error : error
            })
        }
    
        forecast(latitude,longitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error : error
                })
            }
            console.log(forecastData)
            res.send({
                address : req.query.address,
                location : location,
                latitude : latitude,
                longitude : longitude,
                forecastData : forecastData
            })
        })
    })
    
})

// app.get('', (req,res) => {
//     res.send('Hello express!')
// })

// app.get('/help', (req,res) => {
//     res.send('<h1>Help page!</h1>')
// })

// app.get('/me', (req,res) => {
//     res.send({
//         name : 'nymika',
//         age : 18
//     })
// })

// app.get('/about/*', (req,res) => {
//     res.send('About background article not found!')
// })

// app.get('*',(req,res) => {
//     res.send('My 404 error')
// })

// app.get('/products', (req,res) => {

//     if(!req.query.search) {
//         return res.send({
//             error : 'must include a search term'
//         })
//     }
//     console.log(req.query)
//     res.send({
//         products : []
//     })
// })

app.get('/help/*', (req,res) => {
    res.render('error', {
        title : '404',
        author : 'Nym',
        errorMessage : 'Help article not found'
    })
})

app.get('*', (req,res) => {
    res.render('error', {
        title : '404',
        errorMessage : 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server on portnumber ' + port)
})