import axios from 'axios'

import {LOAD_ORDERVIEW} from '../constants/orderView'

export const _loadOrderView = orderView => ({
  type: LOAD_ORDERVIEW,
  orderView
})

export const loadOrderConfirmation = (id) => {
  return (dispatch) => {
    axios.get(`/api/orders/${id}`)
    .then(response => response.data)
    .then(order => dispatch(_loadOrderView(order)))
    .catch(err => console.log(`Unable to retrieve order view: ${id}. ${err.message}`))
  }
}