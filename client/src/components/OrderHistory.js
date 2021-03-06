import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import queryString from 'query-string'

import {loadOrderHistory} from '../actions/orderHistory'

class Orders extends React.Component{
  render(){
    if (!this.props || this.props.auth.id === undefined){
      return (
        <div className="container w-75 p-3 my-3 bg-white">
            <h5 className="title centered"><p><strong>Oops!</strong></p></h5>
            <h6 className="title centered"><p>Please log in to view your order history.</p></h6>
        </div>
      )
    }
    return (
      <div className="container w-75 p-3 my-3 bg-white">
        <h5 className="mt-4"><strong>Your Cart</strong></h5>
        <div className="row my-3">
          <div className="col-sm-8">
            <strong>ID#:</strong> <Link to="/cart">{this.props.cart.id} </Link>
          </div>
          <div className="col-sm-4">
            <strong>Status:</strong> {this.props.cart.status}
          </div>
        </div>
        {
          this.props.orderHistory.length ? (
            <h5 className="mt-4"><strong>Past Orders</strong></h5>
          ) : (
            ''
          )
        }
        {this.props.orderHistory.map( order => (
          <div key={order.id} className="row my-3">
            <div className="col-sm-8">
              <strong>ID#:</strong> <Link to={`/orderview/${order.id}`}>{order.id} </Link>
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
