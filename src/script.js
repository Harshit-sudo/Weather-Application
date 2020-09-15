

const weatherForm = document.querySelector('.form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
     console.log(location)

     console.log('Testing')
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch('/weather?address=' + location)
    .then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = 'Unable to find Location! Try another Search'
            } else {
                messageOne.textContent = "City - " + location
                messageTwo.textContent = "The weather is "+  data.view + "." + " It is currently " + data.temperature + ' degrees out.'
            }
        })
    })
})