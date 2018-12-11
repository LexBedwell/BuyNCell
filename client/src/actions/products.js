import axios from 'axios'

import LOAD_PRODUCTS from '../constants/products'

export const loadProducts = products => ({
  type: LOAD_PRODUCTS,
  products
})

export const _loadProducts = () => {
  return (dispatch) => {
    axios.get('/api/products')
      .then(response => response.data)
      .then(products => dispatch(loadProducts(products)))
  }
}
