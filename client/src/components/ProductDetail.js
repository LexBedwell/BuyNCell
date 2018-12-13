import React from 'react'
import {connect} from 'react-redux'

class ProductDetail extends React.Component{
  render(){
    const {product} = this.props
    if (!product){
      return null
    }
    return (
      <div key={product.id}>
        <ul>
          <li>**PHOTO GOES HERE**</li>
          <li>{product.name}</li>
          <li>{product.description}</li>
          <li>{product.price}</li>
          <li>{product.quantity}</li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const product = state.products.filter( product => product.id === ownProps.match.params.productId * 1)
  return {product: product[0]}
}

export default connect(mapStateToProps)(ProductDetail)
