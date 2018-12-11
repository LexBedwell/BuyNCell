import React from 'react'
import {HashRouter, Route} from 'react-router-dom'

import Header from './Header'
import Main from './Main'
import ProductList from './ProductList'
import ProductDetail from './ProductDetail'

import {_loadCategories} from '../actions/categories'
import {_loadProducts} from '../actions/products'
import {connect} from 'react-redux'

class App extends React.Component{
  render(){
    return (
      <HashRouter>
        <div>
          <Route path="/" component={Header} />
          <Route exact path="/" component={Main} />
          <Route exact path="/products" component={ProductList} />
          <Route path="/products/:productId" component={ProductDetail} />
        </div>
      </HashRouter>
    )
  }
  componentDidMount(){
    this.props.init()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => {
      dispatch(_loadProducts())
      dispatch(_loadCategories())
    }
  }
}

export default connect(null, mapDispatchToProps)(App)

