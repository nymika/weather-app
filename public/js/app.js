console.log('Client side javascript file!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const query = document.querySelector('input')

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = query.value;
    console.log(location)

    messageOne.textContent='Loading...'
    messageTwo.textContent=''

    fetch('/weather?address=' + encodeURIComponent(location)).then( (response) => {
        response.json().then( (data) => {
            if(data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            }
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecastData
                console.log(data.location)
                console.log(data.forecastData)
            }
        })
    })
    
})