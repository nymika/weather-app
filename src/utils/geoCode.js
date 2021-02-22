const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibnltaWthIiwiYSI6ImNrOTA2c2M2OTB5NDgzbXRhNmxkcGF6ZWQifQ.UPHv6nyW_Oy8YOzWjMl1oA&limit=1'
    request ( { url, json : true}, (error,{body}) => {
        if(error) {
            callback('Unable to connect to internet', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to find location!', undefined)
        }
        else {
            callback(undefined, {
                latitude : body.features[0].center[1],
                longitude : body.features[0].center[0],
                location : body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode


// const geoCodeurl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/hyderabad.json?access_token=pk.eyJ1IjoibnltaWthIiwiYSI6ImNrOTA2c2M2OTB5NDgzbXRhNmxkcGF6ZWQifQ.UPHv6nyW_Oy8YOzWjMl1oA&limit=1'
// request( {url:geoCodeurl, json:true}, (error,response) => {
//     if (error) {
//         console.log('Unable to connect to internet')
//     }
//     else if (response.body.features.length === 0) {
//         console.log('Unable to find location!')
//     }
//     else {
//     console.log(response.body.features[0].center[1] + ' is the latitude. ')
//     console.log(response.body.features[0].center[0] + ' is the longitude. ')
//     }
// })