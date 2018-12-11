
import React from 'react'
import {connect} from 'react-redux'

class ProductList extends React.Component{
  render(){
    return (
      <ul>
        {this.props.products.map( product => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    )
  }
}

const mapStateToProps = ({products}) => {
  return {
    products
  }
}

export default connect(mapStateToProps)(ProductList)