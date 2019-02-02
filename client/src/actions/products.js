import axios from 'axios'

import {LOAD_PRODUCTS} from '../constants/products'

export const _loadProducts = products => ({
  type: LOAD_PRODUCTS,
  products
})

export const loadProducts = () => {
  return (dispatch) => {
    axios.get('/api/products')
      .then(response => response.data)
      .then(products => dispatch(_loadProducts(products)))
      .catch(err => console.log('Unable to load products: ', err.message))
  }
}
