import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import queryString from 'query-string'

import {_setCart, setCart} from '../actions/cart'

class Cart extends React.Component {
  render(){
    if (!this.props || this.props.lineItems === undefined){
      return null
    }
    if (this.props.lineItems.length === 0 || this.state.lineItems.length === 0){
      return <h6>Cart Empty!</h6>
    }
    return (
      <div>
        <form id="addToCart" onSubmit={this.handleSubmit}>
          {this.props.lineItems.map( lineItem => {
            let index = this.props.lineItems.indexOf(lineItem)
            return (
              <p key={lineItem.id}><strong>Name: </strong>{lineItem.product.name} // <strong>Quantity: </strong><input value={this.state.lineItems[index].quantity} onChange={this.handleChange} name={index.toString()} /></p>
            )
          })}
        <p><button type="submit" className="btn btn-primary">Update Cart</button></p>
        </form>
        <p><input type="button" className="btn btn-success" value="Checkout" onClick={this.orderCheckout} /></p>
      </div>
    )
  }
  constructor(){
    super()
    this.state = {
      lineItems: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.orderCheckout = this.orderCheckout.bind(this)
  }
  handleChange(ev){
    let newLineItems = this.state.lineItems
    newLineItems[parseInt(ev.target.name, 10)].quantity = parseInt(ev.target.value, 10)
    this.setState({
      lineItems: newLineItems
    })
  }
  handleSubmit(ev){
    ev.preventDefault()
    this.syncCartWithServer()
    this.props.history.push(`/orders`)
  }
  syncCartWithServer(){
    let newCart = this.state
    let newCartKeys = ['id', 'addressName', 'addressLine', 'addressCity', 'addressState', 'addressZip']
    newCartKeys.forEach( key => newCart[key] = this.props[key])
    this.props.updateCart(newCart)
  }
  orderCheckout(){
    this.syncCartWithServer()
    this.props.history.push(`/checkout`)
  }
  componentDidMount(){
    if (this.props){ 
      this.setState({lineItems: this.props.lineItems})
    }
  }
}

const mapStateToProps = ({cart}) => {
  return cart
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
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Cart)

