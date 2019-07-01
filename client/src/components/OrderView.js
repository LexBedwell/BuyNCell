import React from 'react'
import {connect} from 'react-redux'

import {loadOrderView} from '../actions/orderView'

// eslint-disable-next-line react/no-deprecated
class Cart extends React.Component {
  render(){
    if (!this.props || this.props.orderView.lineItems === undefined){
      return (
        <div className="container w-75 p-3 my-3 bg-white">
            <h5 className="title centered"><p><strong>Oops!</strong></p></h5>
            <h6 className="title centered"><p>We're unable to find this order in our database.</p></h6>
        </div>
      )
    }
    return (
      <div>
        <div className="container w-75 p-3 my-4 bg-white">
          <h5><strong>Your Order</strong> ({this.props.orderView.status}) </h5>
            <div className="form-row offset-sm-1 col-sm-11 text-center mb-4">
              <div className="col-sm-6 my-1 text-left">
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
            </div>
            {this.props.orderView.lineItems.map( lineItem => {
              return (
                <div className="form-row offset-sm-1 col-sm-11 my-1" key={lineItem.id}>
                  <div className="col-sm-6 my-1">
                    {lineItem.product.name}
                  </div>
                  <div className="col-sm-2 my-1 text-center">
                    {lineItem.quantity}
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
              <div className="col-sm-10 text-left">
                <strong>Grand Total</strong>
              </div>
              <div className="col-sm-2 text-center">
                <strong>${this.props.orderView.lineItems.reduce( (accumulator, currentValue) => {return accumulator + currentValue.quantity * parseFloat(currentValue.product.price)}, 0).toFixed(2)}</strong>
              </div>
            </div>
        </div>
          <div className="container w-75 p-3 my-4 bg-white">
            <h6><strong>Your Shipping Information</strong></h6>
              <div className="form-row offset-sm-1 col-sm-11 my-1">
                <div className="col-sm-7 my-1">
                  Name:
                </div>
                <div className="col-sm-5 my-1 text-left">
                  {this.props.orderView.addressName}
                </div>
              </div>

              <div className="form-row offset-sm-1 col-sm-11 my-1">
                <div className="col-sm-7 my-1">
                  Address:
                </div>
                <div className="col-sm-5 my-1 text-left">
                  {this.props.orderView.addressLine}
                </div>
              </div>

              <div className="form-row offset-sm-1 col-sm-11 my-1">
                <div className="col-sm-7 my-1">
                  City:
                </div>
                <div className="col-sm-5 my-1 text-left">
                  {this.props.orderView.addressCity}
                </div>
              </div>

              <div className="form-row offset-sm-1 col-sm-11 my-1">
                <div className="col-sm-7 my-1">
                  State:
                </div>
                <div className="col-sm-5 my-1 text-left">
                  {this.props.orderView.addressState}
                </div>
              </div>

              <div className="form-row offset-sm-1 col-sm-11 my-1">
                <div className="col-sm-7 my-1">
                  Zip:
                </div>
                <div className="col-sm-5 my-1 text-left">
                  {this.props.orderView.addressZip}
                </div>
              </div>
          </div>
      </div>
    )
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
