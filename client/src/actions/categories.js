import axios from 'axios'

import {LOAD_CATEGORIES} from '../constants/categories'

export const _loadCategories = categories => ({
  type: LOAD_CATEGORIES,
  categories
})

export const loadCategories = () => {
  return (dispatch) => {
    axios.get('/api/categories')
      .then(response => response.data)
      .then(categories => dispatch(_loadCategories(categories)))
      .catch(err => console.log('Unable to load categories: ', err.message))
  }
}
