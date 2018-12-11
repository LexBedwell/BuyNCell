import {combineReducers, createStore, applyMiddleware} from 'redux'
import loggerMiddleware from 'redux-logger'
import thunkMiddleware from 'redux-thunk'

import products from './reducers/products'

const reducer = combineReducers({
  products
})

export default createStore(reducer, applyMiddleware(loggerMiddleware, thunkMiddleware))
