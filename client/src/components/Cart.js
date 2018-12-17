import React from 'react'
import {connect} from 'react-redux'

class Cart extends React.Component {
  render(){
    if (Object.keys(this.props.cart).length === 0){
      return null
    }
    if (this.props.cart.lineItems.length === 0){
      return <h6>Cart Empty!</h6>
    }
    return (
      <ul>
        {this.props.cart.lineItems.map( lineItem => <li key={lineItem.id}>{lineItem.product.name} Quantity: {lineItem.quantity}</li>)}
      </ul>
    )
  }
  constructor(){
    super()
    this.state = {
      cart: this.props ? this.props.cart : {}
    }
  }
}

const mapStateToProps = (state) => {
  return state
}

module.exports = connect(mapStateToProps)(Cart)
