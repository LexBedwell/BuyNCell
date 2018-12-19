import {LOAD_ORDERHISTORY} from '../../constants/orderHistory'

export default (state = [], action) => {
  switch (action.type){
    case LOAD_ORDERHISTORY:
      return action.orderHistory
    default:
      return state
  }
}