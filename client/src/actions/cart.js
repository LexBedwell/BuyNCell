import axios from 'axios'

import {SET_CART} from '../constants/cart'

export const _setCart = cart => ({
  type: SET_CART,
  cart
})

export const setCart = ({token}) => {
  return (dispatch) => {
    axios.get('/api/orders/cart', {
      headers: {
        authorization: token
      }
    })
      .then(response => response.data)
      .then(cart => dispatch(_setCart(cart)))
      .catch(err => console.log('Unable to set cart: ', err.message))
  }
}
