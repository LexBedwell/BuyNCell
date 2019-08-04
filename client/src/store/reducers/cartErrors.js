import {SET_CART_ERRORS} from '../../constants/cartErrors'

export default (state = {}, action) => {
  switch (action.type){
    case SET_CART_ERRORS:
      return action.cartErrors
    default:
      return state
  }
}
