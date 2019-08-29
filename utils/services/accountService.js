const axios = require('axios')

const findUser = userId => {
    axios.get(process.env.ACCOUNT_SERVICE_URL + `/user/?id=${userId}`)
        .then( response => {
            if(response.email && !response.error) {
                return {id: userId, email: accountServiceResponse.email}
            } else {
                return null
            }
        })
        .catch(next)
}

const findOrCreateUser = email => {
    axios.post(process.env.INVENTORY_SERVICE_URL + '/create', {email})
        .then( response => {return response})
        .catch(next)
}

module.exports = { findUser, findOrCreateUser }