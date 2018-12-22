import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import queryString from 'query-string'

import {_setCart, setCart} from '../actions/cart'

class ProductDetail extends React.Component{
  render(){
    const {cart, product} = this.props
    if (!product){
      return null
    }
    return (
      <div className="container w-75 p-3 my-3 bg-light">
        <img className="productImage" src={product.photo} />
        <ul>
          <li><strong>{product.name}</strong></li>
          <li><em>{product.description}</em></li>
          <li>${product.price}</li>
        </ul>
        <form id="addToCart" onSubmit={this.handleSubmit}>
          <p><b>Quantity: </b><input value={this.state.quantity} onChange={this.handleChange} name="quantity" /></p>
          <p><button type="submit" className="btn btn-outline-success btn-sm" disabled = {(this.state.quantity < 1)}>Add to Cart!</button></p>
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
    let matchingLineItemIndex = this.props.cart.lineItems.findIndex( lineItem => { return lineItem.productId === productId})
    if (matchingLineItemIndex !== -1){
      newCart.lineItems[matchingLineItemIndex].quantity = newCart.lineItems[matchingLineItemIndex].quantity + cartQuantity
      this.props.updateCart(newCart)
      this.props.history.push(`/cart`)
    } else {
      this.props.addLineItem({cartId: newCart.id, productId: productId, quantity: cartQuantity})
        .then( response => response.data)
        .then( lineItem => newCart.lineItems.push(lineItem))
        .then( () => this.props.updateCart)
        .then( () => this.props.history.push(`/cart`))
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const product = state.products.filter( product => product.id === ownProps.match.params.productId * 1)
  return {cart: state.cart, product: product[0]}
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: (newCart) => {
      if (newCart.userId){
      axios.put('/api/orders', newCart)
        .then( () => dispatch(setCart(queryString.parse(window.localStorage.getItem('token')))))
      } else {
        axios.put('/api/orders', newCart)
        .then( () => dispatch(_setCart(newCart)))
      }
    },
    addLineItem: (cart) => {
      return axios.put('/api/lineItems', cart)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail)
