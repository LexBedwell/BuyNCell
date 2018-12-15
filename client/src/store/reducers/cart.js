import {LOAD_CART} from '../../constants/cart'

export default (state = {}, action) => {
  switch (action.type){
    case LOAD_CART:
      return action.cart
    default:
      return state
  }
}