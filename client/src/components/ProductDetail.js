import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'

import {_setCart} from '../actions/cart'

class ProductDetail extends React.Component{
  render(){
    const {cart, product} = this.props
    if (!product){
      return null
    }
    return (
      <div key={product.id}>
        <ul>
          <li>**PHOTO GOES HERE**</li>
          <li>Name: {product.name}</li>
          <li>Description: {product.description}</li>
          <li>Price: {product.price}</li>
          <li>Quantity: {product.quantity}</li>
        </ul>
        <form id="addToCart" onSubmit={this.handleSubmit}>
          <p><b>Quantity: </b><input value={this.state.quantity} onChange={this.handleChange} name="quantity" /></p>
          <p><button type="submit" className="btn btn-primary" disabled = {(this.state.quantity < 1)}>Add to Cart!</button></p>
        </form>
      </div>
    )
  }
  constructor(){
    super()
    this.state = {
        quantity: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}
  handleChange(ev){
    this.setState({[ev.target.name]: ev.target.value});
  }
  handleSubmit(ev){
    ev.preventDefault()
    let newCart = this.props.cart
    let cartQuantity = parseInt(this.state.quantity, 10)
    let productId = this.props.product.id
    let matchingLineItemIndex = this.props.cart.lineItems.findIndex( function(lineItem){ return lineItem.productId === productId})
    if (matchingLineItemIndex !== -1){
      newCart.lineItems[matchingLineItemIndex].quantity = newCart.lineItems[matchingLineItemIndex].quantity + cartQuantity
      this.props.updateCart(newCart)
    }
    this.props.history.push(`/cart`)
  }
}

const mapStateToProps = (state, ownProps) => {
  const product = state.products.filter( product => product.id === ownProps.match.params.productId * 1)
  return {cart: state.cart, product: product[0]}
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: (newCart) => {
      axios.put('/api/lineitems', {newCart})
        .then( () => dispatch(_setCart(newCart)))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
