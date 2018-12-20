import {combineReducers, createStore, applyMiddleware} from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import auth from './reducers/auth'
import cart from './reducers/cart'
import categories from './reducers/categories'
import orderHistory from './reducers/orderHistory'
import products from './reducers/products'

const reducer = combineReducers({
  auth,
  cart,
  categories,
  orderHistory,
  products
})

export default createStore(reducer, applyMiddleware(loggerMiddleware, thunkMiddleware))
