import React from 'react'
import {connect} from 'react-redux'

class Cart extends React.Component {
  render(){
    if (!this.props.lineItems){
      return (
        <h3>Cart empty!</h3>
      )
    }
    return (
      <ul>
        {this.props.lineItems.map( lineItem => <li key={lineItem.id}>{lineItem.product.name} Quantity: {lineItem.quantity}</li>)}
      </ul>
    )
  }
}

const mapStateToProps = ({cart}) => {
  return cart
}

module.exports = connect(mapStateToProps)(Cart)
