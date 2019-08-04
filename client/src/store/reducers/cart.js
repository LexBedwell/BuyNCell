import {SET_CART} from '../../constants/cart'

export default (state = {}, action) => {
  switch (action.type){
    case SET_CART:
      return action.cart
    default:
      return state
  }
}
