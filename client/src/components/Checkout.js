import React from 'react'
import {connect} from 'react-redux'

class Checkout extends React.Component{
  render(){
    if (!this.props || !this.props.lineItems || !this.props.id){
      return null
    }
    if (this.props.lineItems.length === 0){
      return <h6>Cart Empty!</h6>
    }
    console.log('this.props is ', this.props)
    console.log('this.state is ', this.props)
    return (
      <div>
        <h5>Your Cart:</h5>
        <ul>
          {this.props.lineItems.map( lineItem => <li key={lineItem.id}>Name: {lineItem.product.name} // Quantity: {lineItem.quantity}</li>)}
        </ul>
        <form id="addToCart" onSubmit={this.handleSubmit}>
          <p><b>Name: </b><input value={this.state.addressName} onChange={this.handleChange} name="addressName" /></p>
          <p><b>Address: </b><input value={this.state.addressLine} onChange={this.handleChange} name="addressLine" /></p>
          <p><b>City: </b><input value={this.state.addressCity} onChange={this.handleChange} name="addressCity" /></p>
          <p><b>State: </b><input value={this.state.addressState} onChange={this.handleChange} name="addressState" /></p>
          <p><b>Zip Code: </b><input value={this.state.addressZip} onChange={this.handleChange} name="addressZip" /></p>
          <p><button type="submit" className="btn btn-success">Update Cart</button></p>
        </form>
      </div>
    )
  }
  constructor(){
    super()
    this.state = {
      addressName: '',
      addressLine: '',
      addressCity: '',
      addressState: '',
      addressZip: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(ev){
    this.setState({[ev.target.name]: ev.target.value});
  }
  handleSubmit(ev){
    ev.preventDefault()
    console.log('handleSubmit firing!')
  }
  componentDidMount(){
    console.log('component mounts with this.props as: ', this.props)
    if (this.props){
      this.setState({
        addressName: this.props.addressName,
        addressLine: this.props.addressLine,
        addressCity: this.props.addressCity,
        addressState: this.props.addressState,
        addressZip: this.props.addressZip
      })
    }
  }
}

const mapStateToProps = ({cart}) => {
  return cart
}

export default connect(mapStateToProps)(Checkout)
