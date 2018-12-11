import LOAD_PRODUCTS from '../../constants/products'

export default (state = [], action) => {
  switch (action.type){
    case LOAD_PRODUCTS:
      return action.products
    default:
      return state
  }
}
