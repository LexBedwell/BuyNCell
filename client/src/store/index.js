import {combineReducers, createStore, applyMiddleware} from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import auth from './reducers/auth'
import cart from './reducers/cart'
import cartErrors from './reducers/cartErrors'
import categories from './reducers/categories'
import orderConfirmation from './reducers/orderConfirmation'
import orderHistory from './reducers/orderHistory'
import orderView from './reducers/orderView'
import products from './reducers/products'

const reducer = combineReducers({
  auth,
  cart,
  cartErrors,
  categories,
  orderConfirmation,
  orderHistory,
  orderView,
  products
})

let middlewares = {}

if (process.env.NODE_ENV === 'development'){
  middlewares = applyMiddleware(loggerMiddleware, thunkMiddleware)
} else {
  middlewares = applyMiddleware(thunkMiddleware)
}

export default createStore(reducer, middlewares)
