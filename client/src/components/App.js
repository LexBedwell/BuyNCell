import React from 'react'
import {HashRouter, Route} from 'react-router-dom'

import Header from './Header'
import Main from './Main'
import ProductList from './ProductList'

import {_loadProducts} from '../actions/products'
import {connect} from 'react-redux'

class App extends React.Component{
  render(){
    return (
      <HashRouter>
        <div>
          <Route path="/" component={Header} />
          <Route exact path="/" component={Main} />
          <Route path="/products" component={ProductList} />
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
    }
  }
}

export default connect(null, mapDispatchToProps)(App)

