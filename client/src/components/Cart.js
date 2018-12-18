import React from 'react'
import {connect} from 'react-redux'

class Cart extends React.Component {
  render(){
    if (!this.props || this.props.lineItems === undefined){
      return null
    }
    if (this.props.lineItems.length === 0 || this.state.lineItems.length === 0){
      return <h6>Cart Empty!</h6>
    }
    return (
      <form id="addToCart" onSubmit={this.handleSubmit}>
        {this.state.lineItems.map( lineItem => {
          let index = this.props.lineItems.indexOf(lineItem)
          return (
            <p key={lineItem.id}><strong>Name: </strong>{lineItem.product.name} // <strong>Quantity: </strong><input value={this.state.lineItems[index].quantity} onChange={this.handleChange} name={index.toString()} /></p>
          )
        })}
      <p><button type="submit" className="btn btn-primary">Update Cart!</button></p>
      </form>
    )
  }
  constructor(){
    super()
    this.state = {
      lineItems: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(ev){
    let newLineItems = this.state.lineItems
    let parsed = parseInt(ev.target.name, 10)
    newLineItems[parsed].quantity = ev.target.value
    this.setState({
      lineItems: newLineItems
    })
  }
  handleSubmit(ev){
    ev.preventDefault()
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

module.exports = connect(mapStateToProps)(Cart)
