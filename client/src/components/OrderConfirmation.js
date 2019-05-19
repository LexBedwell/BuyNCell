import React from 'react'
import {connect} from 'react-redux'

class OrderConfirmation extends React.Component {
    render(){
        return (
            <div className="container w-75 p-3 my-3 bg-white">
                <h5 className="title centered"><strong>Thank you for your order!</strong></h5>
            </div>
        )
    }
}

const mapStateToProps = (orderConfirmation) => {
    return orderConfirmation
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    init: () => {
      dispatch(getOrderConfirmation(ownProps.match.params.orderId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation)