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
                  <h5 className="title centered"><p><strong>Thank you for your order!</strong></p></h5>
                  <h6 className="title centered"><p>Your order ID number is: <stonrg>{orderConfirmation.id}</stonrg>. A confirmation email has been sent to your account.</p></h6>
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