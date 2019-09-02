const axios = require('axios')

const findUser = async userId => {
    try {
        let response = await axios.get(process.env.ACCOUNT_SERVICE_URL + `/user/?id=${userId}`)
        if (response.data.email && !response.data.error) {
                return {id: userId, email: response.data.email}
            } else {
                return null
            }
    } catch (err){
        console.error('Unable to find user with account-service:', err.message)
    }
}

const findOrCreateUser = async email => {
    try {
        let response = await axios.post(process.env.ACCOUNT_SERVICE_URL + '/create', {email})
        return response.data
    } catch (err){
        console.error('Unable to find or create user with account-service:', err.message)
    }
}

module.exports = { findUser, findOrCreateUser }