import React from 'react'
import {connect} from 'react-redux'

import {loadOrderConfirmation} from '../actions/orderConfirmation'

class OrderConfirmation extends React.Component {
    render(){
      const orderConfirmation = this.props.orderConfirmation
      if (!orderConfirmation){
        return null
      }
      if (orderConfirmation.id !== 'unable to retrieve order') {
          return (
              <div className="container w-75 p-3 my-3 bg-white">
                  <p><h5 className="title centered"><strong>Thank you for your order!</strong></h5></p>
                  <p><h6 className="title centered">Your order number is {orderConfirmation.id}. A confirmation email has been sent to your account.</h6></p>
              </div>
          )
      } else {
        return (
          <div className="container w-75 p-3 my-3 bg-white">
            <h6 className="title centered">Unable to retrieve order confirmation. Please try again later.</h6>
          </div>
        )
      }
    }
    componentDidMount(){
      this.props.init()
    }
}

const mapStateToProps = (orderConfirmation) => {
    return orderConfirmation
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    init: () => {
      dispatch(loadOrderConfirmation(ownProps.match.params.orderId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation)