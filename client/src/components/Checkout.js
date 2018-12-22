import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import queryString from 'query-string'

import {setCart} from '../actions/cart'

// eslint-disable-next-line react/no-deprecated
class Checkout extends React.Component{
  render(){
    if (!this.props || this.props.lineItems === undefined){
      return null
    }
    if (this.props.lineItems.length === 0){
      return <h6>Cart Empty!</h6>
    }
    return (
      <div className="container w-75">
        <h5 className="bg-light">Order Summary</h5>
        <div className="row offset-sm-1 col-sm-11 text-center">
          <div className="col-sm-4">
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
        {this.props.lineItems.map( lineItem => (
          <div key={lineItem.id} className="row offset-sm-1 col-sm-11 text-center">
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
        <div className="row offset-sm-1 col-sm-11 text-center">
          <div className="col-sm-7 bg-light text-left">
            <strong>Grand Total</strong>
          </div>
          <div className="col-sm-4 bg-light">
            <strong>${this.props.lineItems.reduce( (accumulator, currentValue) => {return accumulator + currentValue.quantity * parseFloat(currentValue.product.price)}, 0).toFixed(2)}</strong>
          </div>
        </div>
        <h5 className="bg-light mt-4">Shipping Information</h5>
        <form id="addToCart" onSubmit={this.handleSubmit}>
          <div className="form-group row offset-sm-1 col-sm-11">
            <label className="col-sm-3 col-form-label">Name: </label>
            <div className="col-sm-9">
              <input className="form-control" type="text" value={this.state.addressName} onChange={this.handleChange} name="addressName" />
            </div>
          </div>
          <div className="form-group row offset-sm-1 col-sm-11">
            <label className="col-sm-3 col-form-label">Address: </label>
            <div className="col-sm-9">
              <input className="form-control" type="text" value={this.state.addressLine} onChange={this.handleChange} name="addressLine" />
            </div>
          </div>
          <div className="form-group row offset-sm-1 col-sm-11">
            <label className="col-sm-3 col-form-label">City: </label>
            <div className="col-sm-9">
              <input className="form-control" type="text" value={this.state.addressCity} onChange={this.handleChange} name="addressCity" />
            </div>
          </div>
          <div className="form-group row offset-sm-1 col-sm-11">
            <label className="col-sm-3 col-form-label">State: </label>
            <div className="col-sm-9">
              <input className="form-control" type="text" value={this.state.addressState} onChange={this.handleChange} name="addressState" />
            </div>
          </div>
          <div className="form-group row offset-sm-1 col-sm-11">
            <label className="col-sm-3 col-form-label">Zip Code: </label>
            <div className="col-sm-9">
              <input className="form-control" type="text" value={this.state.addressZip} onChange={this.handleChange} name="addressZip" />
            </div>
          </div>
          <div className="form-group row offset-sm-1 col-sm-11">
            <div className="offset-sm-6 col-sm-6">
              <button type="submit" className="btn btn-outline-success">Submit Order</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
  constructor(props){
    super(props)
    this.state = {
      addressName: props ? props.addressName : '',
      addressLine: props ? props.addressLine : '',
      addressCity: props ? props.addressCity : '',
      addressState: props ? props.addressState : '',
      addressZip: props ? props.addressZip : ''
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
    newCartKeys.forEach( key => newCart[key] = this.props[key])
    this.props.submitCart(newCart)
    window.alert('Thank you! Your order has been submitted!')
    this.props.history.push(`/`)
  }
  componentWillReceiveProps(props){
    if (props){
      const keys = ['addressName', 'addressLine', 'addressCity', 'addressState', 'addressZip']
      keys.forEach( key => props[key] ? this.setState({[key]: props[key]}) : this.setState({key: ''}))
    }
  }
}

const mapStateToProps = ({cart}) => {
  return cart
}

const mapDispatchToProps = (dispatch) => {
  return {
    submitCart: (newCart) => {
      axios.put('/api/orders/submit', newCart)
        .then( () => dispatch(setCart(queryString.parse(window.localStorage.getItem('token')))))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
