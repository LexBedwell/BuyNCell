
import {SET_CART_ERRORS} from '../constants/cartErrors'

export const _setCartErrors = cartErrors => ({
  type: SET_CART_ERRORS,
  cartErrors
})

export const setCartErrors = cartErrors => (dispatch) => dispatch(_setCartErrors(cartErrors))
