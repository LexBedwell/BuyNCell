import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import queryString from 'query-string'

import {_setCart, setCart} from '../actions/cart'

// eslint-disable-next-line react/no-deprecated
class Cart extends React.Component {
  render(){
    if (!this.props || this.props.lineItems === undefined || this.state.lineItems === undefined){
      return null
    }
    return (
      <div className="container w-75 p-3 my-4 bg-white">
        <h5><strong>Your Cart</strong></h5>
        <form className="pt-3" id="addToCart" onSubmit={this.handleSubmit}>
          <div className="form-row offset-sm-1 col-sm-11 text-center mb-4">
            <div className="col-sm-5 my-1 text-left">
              <strong>Name</strong>
            </div>
            <div className="col-sm-2 my-1">
              <strong>Quantity</strong>
            </div>
            <div className="col-sm-2 my-1">
              <strong>Price</strong>
            </div>
            <div className="col-sm-2 my-1">
              <strong>Total</strong>
            </div>
            <div className="col-sm-1 my-1">
              <strong>Remove</strong>
            </div>
          </div>
          {this.props.lineItems.map( lineItem => {
            let index = this.props.lineItems.indexOf(lineItem)
            return (
              <div className="form-row offset-sm-1 col-sm-11 my-1" key={lineItem.id}>
                <div className="col-sm-5 my-1">
                  {lineItem.product.name}
                </div>
                <div className="col-sm-2 my-1 text-center">
                  <input className="form-control" type="number" value={lineItem.quantity} onChange={this.handleChange} name={index.toString()} />
                </div>
                <div className="col-sm-2 my-1 text-center">
                  ${lineItem.product.price}
                </div>
                <div className="col-sm-2 my-1 text-center">
                  ${lineItem.quantity ? (lineItem.quantity * lineItem.product.price).toFixed(2) : 0}
                </div>
                <div className="col-sm-1 my-1 text-center">
                  <input type="button" className="btn btn-outline-danger btn-sm" value="X" onClick={() => {this.deleteLineItem(lineItem)}} />
                </div>
              </div>
            )
          })}
          <div className="form-row offset-sm-1 col-sm-11 mb-1 mt-4">
            <div className="col-sm-9 text-left">
              <strong>Grand Total</strong>
            </div>
            <div className="col-sm-2 text-center">
              <strong>${this.props.lineItems.reduce( (accumulator, currentValue) => {return accumulator + currentValue.quantity * parseFloat(currentValue.product.price)}, 0).toFixed(2)}</strong>
            </div>
          </div>
          <div className="form-row offset-sm-1 col-sm-11 my-3">
            <div className="offset-sm-5 col-sm-7">
              <button type="submit" className="btn btn-outline-primary btn-sm m-3">Update Cart</button>
              <input type="button" className="btn btn-outline-success btn-sm m-3" value="Checkout" onClick={this.orderCheckout} />
            </div>
          </div>
        </form>
      </div>
    )
  }
  constructor(props){
    super(props)
    this.state = {
      lineItems: props ? props.lineItems : []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.orderCheckout = this.orderCheckout.bind(this)
  }
  handleChange(ev){
    let newLineItems = this.state.lineItems
    if ( (parseInt(ev.target.value, 10)) >= 0 ) {
      newLineItems[parseInt(ev.target.name, 10)].quantity = parseInt(ev.target.value, 10)
    } else {
      newLineItems[parseInt(ev.target.name, 10)].quantity = ''
    }
    this.setState({
      lineItems: newLineItems
    })
  }
  handleSubmit(ev){
    ev.preventDefault()
    this.syncCartWithServer()
    window.alert('Cart updated!')
  }
  deleteLineItem(lineItem){
    const filteredLineItems = this.state.lineItems.filter( elem => elem.id !== lineItem.id)
    let newCart = this.state
    newCart.lineItems = filteredLineItems
    const newCartKeys = ['id', 'status', 'addressName', 'addressLine', 'addressCity', 'addressState', 'addressZip']
    newCartKeys.forEach( key => newCart[key] = this.props[key])
    axios.delete(`/api/lineitems/${lineItem.id}`)
      .then( () => this.props.updateCart(newCart))
    this.setState({
      lineItems: filteredLineItems
    })
  }
  syncCartWithServer(){
    let newCart = this.state
    newCart.lineItems.forEach( elem => {
      if (!elem.quantity) {
        axios.delete(`/api/lineitems/${elem.id}`)
      }
    })
    newCart.lineItems = this.state.lineItems.filter( elem => elem.quantity)
    const newCartKeys = ['id', 'status', 'addressName', 'addressLine', 'addressCity', 'addressState', 'addressZip']
    newCartKeys.forEach( key => newCart[key] = this.props[key])
    this.props.updateCart(newCart)
  }
  orderCheckout(){
    this.syncCartWithServer()
    this.props.history.push(`/checkout`)
  }
  componentWillReceiveProps(props){
    if (props.lineItems !== undefined){
      this.setState({lineItems: props.lineItems})
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

