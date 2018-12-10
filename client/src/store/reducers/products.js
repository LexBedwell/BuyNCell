const LOAD_PRODUCTS = 'LOAD_PRODUCTS'

export default (state = [], action) => {
  switch (action.type){
    case LOAD_PRODUCTS:
      return action.products
    default:
      return state
  }
}
