
import React from 'react'
import {connect} from 'react-redux'

class ProductList extends React.Component{
  render(){
    return (
      <div>
        <ul>
          {this.props.categories.map( category => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
        <ul>
          {this.props.products.map( product => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = ({categories, products}) => {
  return {
    categories, products
  }
}

export default connect(mapStateToProps)(ProductList)