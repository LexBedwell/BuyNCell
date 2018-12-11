import {LOAD_CATEGORIES} from '../../constants/categories'

export default (state = [], action) => {
  switch (action.type){
    case LOAD_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
