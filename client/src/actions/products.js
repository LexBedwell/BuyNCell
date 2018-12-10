import axios from 'axios'

const LOAD_PRODUCTS = 'LOAD_PRODUCTS'

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
