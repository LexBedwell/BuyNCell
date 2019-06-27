import {LOAD_ORDERVIEW} from '../../constants/orderView'

export default (state = [], action) => {
  switch (action.type){
    case LOAD_ORDERVIEW:
      return action.orderView
    default:
      return state
  }
}