const axios = require('axios')

const checkInstock = async productId => {
    try {
        let stockStatus
        let response = await axios.get( process.env.INVENTORY_SERVICE_URL + '/inventory/' + productId )
        if (response.data.error) {
            stockStatus = {error: response.data.error}
        } else {
            stockStatus = {isInStock: response.data[productId] || false}
        }
        return stockStatus
    } catch (err) {
        console.error('Unable to check in-stock with inventory-service:', err.message)
    }
}

const sendInventoryServiceOrder = async order => {
    try {
        let response = await axios.put(process.env.INVENTORY_SERVICE_URL + '/inventory', order)
        return response.data
    } catch (err){
        console.error('Unable to send order to inventory-service:', err.message)
    }
}

module.exports = { checkInstock, sendInventoryServiceOrder }
