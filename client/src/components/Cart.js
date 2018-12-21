import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import queryString from 'query-string'

import {_setCart, setCart} from '../actions/cart'

class Cart extends React.Component {
  render(){
    if (!this.props || this.props.lineItems === undefined || this.state.lineItems === undefined){
      return null
    }
    if (this.props.lineItems.length === 0 || this.state.lineItems.length === 0){
      return <h6>Cart Empty!</h6>
    }
    return (
      <div className="container w-75">
        <h5 className="bg-light">Your Cart</h5>
        <form id="addToCart" onSubmit={this.handleSubmit}>
          <div className="form-row offset-sm-1 col-sm-11 text-center">
            <div className="col-sm-4 my-1">
              <strong>Name</strong>
            </div>
            <div className="col-sm-1 my-1">
              <strong>Quantity</strong>
            </div>
            <div className="col-sm-2 my-1">
              <strong>Price</strong>
            </div>
            <div className="col-sm-2 my-1">
              <strong>Total</strong>
            </div>
          </div>
          {this.props.lineItems.map( lineItem => {
            let index = this.props.lineItems.indexOf(lineItem)
            return (
              <div className="form-row offset-sm-1 col-sm-11 my-1" key={lineItem.id}>
                <div className="col-sm-4 my-1">
                  {lineItem.product.name}
                </div>
                <div className="col-sm-1 my-1 text-center">
                  <input className="form-control" type="text" value={this.state.lineItems[index].quantity} onChange={this.handleChange} name={index.toString()} />
                </div>
                <div className="col-sm-2 my-1 text-center">
                  ${lineItem.product.price}
                </div>
                <div className="col-sm-2 my-1 text-center">
                  ${(lineItem.quantity * lineItem.product.price).toFixed(2)}
                </div>
              </div>
            )
          })}
          <div className="form-row offset-sm-1 col-sm-11 my-1">
            <div className="col-sm-5 bg-light text-left">
              <strong>Grand Total</strong>
            </div>
            <div className="col-sm-6 bg-light text-center">
              <strong>${this.props.lineItems.reduce( (accumulator, currentValue) => {return accumulator + currentValue.quantity * parseFloat(currentValue.product.price)}, 0).toFixed(2)}</strong>
            </div>
          </div>
          <div className="form-row offset-sm-1 col-sm-11 my-3">
            <div className="offset-sm-5 col-sm-7">
              <button type="submit" className="btn btn-outline-primary m-3">Update Cart</button>
              <input type="button" className="btn btn-outline-success m-3" value="Checkout" onClick={this.orderCheckout} />  
            </div>
          </div>
        </form>
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
    this.props.history.push(`/orderhistory`)
  }
  syncCartWithServer(){
    let newCart = this.state
    let newCartKeys = ['id', 'status', 'addressName', 'addressLine', 'addressCity', 'addressState', 'addressZip']
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

