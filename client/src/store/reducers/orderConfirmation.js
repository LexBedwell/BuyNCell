import {LOAD_ORDERCONFIRMATION} from '../../constants/orderConfirmation'

export default (state = [], action) => {
  switch (action.type){
    case LOAD_ORDERCONFIRMATION:
      return action.orderConfirmation
    default:
      return state
  }
}
