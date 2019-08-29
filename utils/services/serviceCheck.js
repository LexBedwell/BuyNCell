const axios = require('axios')

const serviceCheck = ( services ) => {
  services.forEach( service => {
    axios.get(service.URL)
    .then( response => {
      if (response.data.response === 'pong' || response.data.response.results === 'pong'){
        console.info(service.name + ' is online at ' + service.URL)
      } else {
        throw new Error('Unable to contact ' + service.name)
      }
    })
    .catch( err => {
      console.error('error: ' + err.message)
      console.warn('Failed to contact ' + service.name + ' at ' + service.URL)
      console.warn(service.name + ' is offline. Some functionality may be disabled.')
    })
  })
}

module.exports = { serviceCheck }
