/* eslint-disable complexity */
import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import queryString from 'query-string'

import {setCart} from '../actions/cart'
import {setCartErrors} from '../actions/cartErrors'

// eslint-disable-next-line react/no-deprecated
class Checkout extends React.Component{
  render(){
    if (!this.props || this.props.cart.lineItems === undefined){
      return null
    }
    if (this.props.cart.lineItems.length === 0){
      return (
        <div className="container w-75 p-3 my-3 bg-white">
          <h6 className="title centered">Your cart is currently empty.</h6>
        </div>
      )
    }
    return (
      <div className="container w-75 p-3 my-3 bg-white">
        <h5><strong>Order Summary</strong></h5>
        <div className="row pt-2 pb-1 text-center">
          <div className="col-sm-4 text-left">
            <strong>Name</strong>
          </div>
          <div className="col-sm-2">
            <strong>Quantity</strong>
          </div>
          <div className="col-sm-2">
            <strong>Price</strong>
          </div>
          <div className="col-sm-2">
            <strong>Total</strong>
          </div>
        </div>
        {this.props.cart.lineItems.map( lineItem => (
          <div key={lineItem.id} className="row text-center">
            <div className="col-sm-4 text-left">
              {lineItem.product.name}
            </div>
            <div className="col-sm-2">
              {lineItem.quantity}
            </div>
            <div className="col-sm-2">
              ${lineItem.product.price}
            </div>
            <div className="col-sm-2">
              ${(lineItem.quantity * lineItem.product.price).toFixed(2)}
            </div>
          </div>
        ))}
        <div className="row text-center">
          <div className="col-sm-7 py-2 text-left">
            <strong>Grand Total</strong>
          </div>
          <div className="col-sm-4">
            <strong>${this.props.cart.lineItems.reduce( (accumulator, currentValue) => {return accumulator + currentValue.quantity * parseFloat(currentValue.product.price)}, 0).toFixed(2)}</strong>
          </div>
        </div>
        <h5 className="mt-5"><strong>Contact and Shipping Information</strong></h5>
        <form id="addToCart" onSubmit={this.handleSubmit}>
        {
          this.props.auth.id ? (
            ''
            ) : (
          <div className="form-group row mt-3">
            <label className="col-sm-3 col-form-label">Email: </label>
            <div className="col-sm-9">
              <input className="form-control" type="email" value={this.state.email} onChange={this.handleChange} name="email" minLength="4" maxLength="40" />
            </div>
          </div>
            )
          }
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Name: </label>
            <div className="col-sm-9">
              <input className="form-control" type="text" value={this.state.addressName} onChange={this.handleChange} name="addressName" minLength="4" maxLength="40" />
            </div>
          </div>
          <div className="form-group row ">
            <label className="col-sm-3 col-form-label">Address: </label>
            <div className="col-sm-9">
              <input className="form-control" type="text" value={this.state.addressLine} onChange={this.handleChange} name="addressLine" minLength="4" maxLength="40" />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">City: </label>
            <div className="col-sm-9">
              <input className="form-control" type="text" value={this.state.addressCity} onChange={this.handleChange} name="addressCity" minLength="2" maxLength="20" />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">State: </label>
            <div className="col-sm-9">
              <input className="form-control" type="text" value={this.state.addressState} onChange={this.handleChange} name="addressState" minLength="2" maxLength="20" />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label">Zip Code: </label>
            <div className="col-sm-9">
              <input className="form-control" type="text" value={this.state.addressZip} onChange={this.handleChange} name="addressZip" minLength="5" maxLength="10" />
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-sm-6 col-sm-6">
          {
          this.props.auth.id ? (
            <button type="submit" className="btn btn-outline-success" disabled = {(!this.state.addressName || !this.state.addressLine || !this.state.addressCity || !this.state.addressState || !this.state.addressZip)}>Submit Order</button>
            ) : (
            <button type="submit" className="btn btn-outline-success" disabled = {(!this.state.addressName || !this.state.addressLine || !this.state.addressCity || !this.state.addressState || !this.state.addressZip || !this.state.email)}>Submit Order</button>
            )
          }
            </div>
          </div>
        </form>
      </div>
    )
  }
  constructor(props){
    super(props)
    this.state = {
      addressName: props ? props.cart.addressName : '',
      addressLine: props ? props.cart.addressLine : '',
      addressCity: props ? props.cart.addressCity : '',
      addressState: props ? props.cart.addressState : '',
      addressZip: props ? props.cart.addressZip : '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(ev){
    this.setState({[ev.target.name]: ev.target.value});
  }
  handleSubmit(ev){
    ev.preventDefault()
    let newCart = this.state
    let newCartKeys = ['id', 'lineItems']
    newCartKeys.forEach( key => newCart[key] = this.props.cart[key])
    if (this.props.auth.id){
      newCart.userId = this.props.auth.id
    }
    try {
      this.props.submitCart(newCart, this.props.history)
    } catch (err) {
      console.log(`Unable to place order. ${err.message}`)
      this.props.history.push(`/cart`)
    }
  }
  componentWillReceiveProps(props){
    if (props){
      const keys = ['addressName', 'addressLine', 'addressCity', 'addressState', 'addressZip']
      keys.forEach( key => props.cart[key] ? this.setState({[key]: props.cart[key]}) : this.setState({key: ''}))
    }
  }
}

const mapStateToProps = ({auth, cart}) => {
  return {
    auth, cart
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitCart: (newCart, history) => {
      axios.put('/api/orders/submit', newCart)
        .then( response => {
          if (response.data.processTransaction === false){
            let cartErrors = {}
            cartErrors.outOfStockItems = []
            Object.keys(response.data).forEach( elem =>{ 
              if (response.data[elem] === false && elem !== 'processTransaction') {
                cartErrors.outOfStockItems.push(elem)
              }
            })
            if (cartErrors.outOfStockItems.length) {
              cartErrors.errorMsg = 'Some items are out of stock. Please remove the below items to complete checkout.'
            } else {
              cartErrors.errorMsg = 'Something went wrong.'
            }
            dispatch(setCartErrors(cartErrors))
            history.push(`/cart`)
          } else {
            history.push(`orderconfirmation/${newCart.id}`)
            dispatch(setCart(queryString.parse(window.localStorage.getItem('token'))))
            dispatch(setCartErrors({}))
          }
        })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
