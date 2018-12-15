
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class ProductList extends React.Component{
  render(){
    return (
      <div>
        <ul>
          {this.props.categories.map( category => <Link key={category.id} to={`/categories/${category.id}`}>{category.name}</Link>)}
        </ul>
        <ul>
          {this.props.products.map( product => <Link key={product.id} to={`/products/${product.id}`}>{product.name}</Link>)}
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
