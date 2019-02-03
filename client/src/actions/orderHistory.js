import axios from 'axios'

import {LOAD_ORDERHISTORY} from '../constants/orderHistory'

export const _loadOrderHistory = orderHistory => ({
  type: LOAD_ORDERHISTORY,
  orderHistory
})

export const loadOrderHistory = ({token}) => {
  return (dispatch) => {
    axios.get('/api/orders/history', {
      headers: {
        authorization: token
      }
    })
      .then(response => response.data)
      .then(orderHistory => dispatch(_loadOrderHistory(orderHistory)))
      .catch(err => console.log('Unable to load order history: ', err.message))
  }
}
