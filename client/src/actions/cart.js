import axios from 'axios'

import {LOAD_CART} from '../constants/cart'

export const _loadCart = cart => ({
  type: LOAD_CART,
  cart
})

export const loadCart = ({token}) => {
  return (dispatch) => {
    axios.get('/api/orders/cart', {
      headers: {
        authorization: token
      }
    })
      .then(response => response.data)
      .then(cart => dispatch(_loadCart(cart)))
  }
}
