import axios from 'axios'

import {LOAD_ORDERCONFIRMATION} from '../constants/orderConfirmation'

export const _loadOrderConfirmation = orderConfirmation => ({
  type: LOAD_ORDERCONFIRMATION,
  orderConfirmation
})

export const loadOrderConfirmation = (id) => {
  return (dispatch) => {
    axios.get(`/api/orders/orderconfirmation/${id}`)
    .then(response => response.data)
    .then(orderConfirmation => dispatch(_loadOrderConfirmation(orderConfirmation)))
    .catch(err => console.log(`Unable to retrieve order confirmation: ${id}. ${err.message}`))
  }
}
