import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {loadOrderConfirmation} from '../actions/orderConfirmation'

class OrderConfirmation extends React.Component {
    render(){
      const orderConfirmation = this.props.orderConfirmation
      if (!orderConfirmation){
        return null
      }
      if (orderConfirmation.id !== 'unable to retrieve order') {
          return (
            <div>
              <div className="container w-75 p-3 my-3 bg-white">
                <h5 className="title centered"><p><strong>Thank you for your order!</strong></p></h5>
                <h6 className="title centered"><p>A confirmation email has been sent to your account.</p></h6>
              </div>
              <div className="container w-75 p-3 my-3 bg-white">
                <h6 className="title left"><p><strong>Your order ID# is: {orderConfirmation.id}</strong>.</p></h6>
                <h6 className="title left"><p>To view your order status, please click {<Link to={`/orderview/${orderConfirmation.id}`}>here</Link>}.</p></h6>
                <h6 className="title left"><p>If you are logged in, you can view your account's full order history {<Link to={`/orderhistory/`}>here</Link>}.</p></h6>
              </div>
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