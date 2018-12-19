import React from 'react'
import {connect} from 'react-redux'
import queryString from 'query-string'

import {loadOrderHistory} from '../actions/orderHistory'

class Orders extends React.Component{
  render(){
    return (
      <div>
        <p>Current Cart: </p>
        <p>ID: {this.props.cart.id} // Status: {this.props.cart.status}</p>
        <p>Past Orders</p>
        {this.props.orderHistory.map( order => <p key={order.id}>ID: {order.id} // Status: {order.status}</p>)}
      </div>
    )
  }
  componentDidMount(){
    this.props.init()
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    init: () => {
      //dispatch(loadProducts())
      //dispatch(setCart(queryString.parse(window.localStorage.getItem('token'))))
      dispatch(loadOrderHistory(queryString.parse(window.localStorage.getItem('token'))))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
