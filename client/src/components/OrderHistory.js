import React from 'react'
import {connect} from 'react-redux'
import queryString from 'query-string'

import {loadOrderHistory} from '../actions/orderHistory'

class Orders extends React.Component{
  render(){
    return (
      <div className="container w-75">
        <h5 className="mt-4">Your Cart</h5>
        <div className="row offset-sm-1 col-sm-11 bg-light">
          <div className="col-sm-8">
            <strong>ID:</strong> {this.props.cart.id}
          </div>
          <div className="col-sm-4">
            <strong>Status:</strong> {this.props.cart.status}
          </div>
        </div>
        <h5 className="mt-4">Past Orders</h5>
        {this.props.orderHistory.map( order => (
          <div key={order.id} className="row offset-sm-1 col-sm-11 my-3 bg-light">
            <div className="col-sm-8">
              <strong>ID:</strong> {order.id}
            </div>
            <div className="col-sm-4">
              <strong>Status:</strong> {order.status}
            </div>
          </div>
        ))}
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
      dispatch(loadOrderHistory(queryString.parse(window.localStorage.getItem('token'))))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)
