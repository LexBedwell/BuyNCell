import React from 'react'
import {HashRouter, Route} from 'react-router-dom'

import Header from './Header'
import Main from './Main'

import {_loadProducts} from '../actions/products'
import { connect } from 'react-redux'

class App extends React.Component{
  render(){
    return (
      <HashRouter>
        <div>
          <Route path="/" component={Header} />
          <Route path="/" component={Main} />
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

