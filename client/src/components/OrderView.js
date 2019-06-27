import React from 'react'
import {connect} from 'react-redux'

import {loadOrderView} from '../actions/cart'

// eslint-disable-next-line react/no-deprecated
class Cart extends React.Component {
  render(){
    if (!this.props || this.props.orderView.lineItems === undefined || this.state.orderView.lineItems === undefined){
      return null
    }
    return (
      <div className="container w-75 p-3 my-4 bg-white">
        <h5><strong>Your Order</strong></h5>
          <div className="form-row offset-sm-1 col-sm-11 text-center mb-4">
            <div className="col-sm-5 my-1 text-left">
              <strong>Name</strong>
            </div>
            <div className="col-sm-2 my-1">
              <strong>Quantity</strong>
            </div>
            <div className="col-sm-2 my-1">
              <strong>Price</strong>
            </div>
            <div className="col-sm-2 my-1">
              <strong>Total</strong>
            </div>
            <div className="col-sm-1 my-1">
              <strong>Remove</strong>
            </div>
          </div>
          {this.props.orderView.lineItems.map( lineItem => {
            let index = this.props.orderView.lineItems.indexOf(lineItem)
            return (
              <div className="form-row offset-sm-1 col-sm-11 my-1" key={lineItem.id}>
                <div className="col-sm-5 my-1">
                  {lineItem.product.name}
                </div>
                <div className="col-sm-2 my-1 text-center">
                  <input className="form-control" type="number" value={lineItem.quantity} onChange={this.handleChange} name={index.toString()} />
                </div>
                <div className="col-sm-2 my-1 text-center">
                  ${lineItem.product.price}
                </div>
                <div className="col-sm-2 my-1 text-center">
                  ${lineItem.quantity ? (lineItem.quantity * lineItem.product.price).toFixed(2) : 0}
                </div>
              </div>
            )
          })}
          <div className="form-row offset-sm-1 col-sm-11 mb-1 mt-4">
            <div className="col-sm-9 text-left">
              <strong>Grand Total</strong>
            </div>
            <div className="col-sm-2 text-center">
              <strong>${this.props.orderView.lineItems.reduce( (accumulator, currentValue) => {return accumulator + currentValue.quantity * parseFloat(currentValue.product.price)}, 0).toFixed(2)}</strong>
            </div>
          </div>
      </div>
    )
  }
  constructor(props){
    super(props)
    this.state = {
      lineItems: props ? props.orderView.lineItems : []
    }
  }
  componentDidMount(){
    this.props.init()
  }
}

const mapStateToProps = (orderView) => {
  return orderView
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    init: () => {
      dispatch(loadOrderView(ownProps.match.params.orderId))
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Cart)

