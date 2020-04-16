const request = require('request')

const forecast = ( latitude, longitude, callback ) => {
    const url = 'http://api.weatherstack.com/current?access_key=cc02a23025ebed56a2a99655ea548aa3&query=' + latitude + ',' + encodeURIComponent(longitude)
    request({url, json : true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        }
        else if (body.error) {
            callback('Wrong input location given!', undefined)
        }
        else {
            callback(undefined,body.current.weather_descriptions[0] + '. It is actually ' + body.current.temperature + '. But it feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = forecast

// const url = 'http://api.weatherstack.com/current?access_key=cc02a23025ebed56a2a99655ea548aa3&query=17.36667,78.46667&units=f'

// // request ({url : url}, (error,response) =>
// // {
// //     //console.log(response)
// //     const data=JSON.parse(response.body)
// //     console.log(data.current)
// // })

// request( {url:url, json:true}, (error,response) => {
//     if(error){
//         console.log('Unable to connect to internet!')
//     }
//     else if (response.body.error) {
//         console.log('Wrong input location given!')
//     }
//     else {
//     //console.log(response.body.current)
//     console.log(response.body.location.name)
//     //console.log(response.body.current.weather_descriptions[0] + '. It is actually ' + response.body.current.temperature + '. But it feels like ' + response.body.current.feelslike + ' degrees out.')
//     }
// })
