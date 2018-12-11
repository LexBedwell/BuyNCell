import axios from 'axios'

import {LOAD_CATEGORIES} from '../constants/categories'

export const loadCategories = categories => ({
  type: LOAD_CATEGORIES,
  categories
})

export const _loadCategories = () => {
  return (dispatch) => {
    axios.get('/api/categories')
      .then(response => response.data)
      .then(categories => dispatch(loadCategories(categories)))
  }
}
