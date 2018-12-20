
import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class ProductList extends React.Component{
  render(){
    return (
      <div className="px-5 py-2">
        <h5 className="text-dark"><strong>Categories</strong></h5>
        <nav>
          <ul className="pagination">
            {this.props.categories.map( category => <li className="page-item" key={category.id} ><Link className="page-link" to={`/categories/${category.id}`}>{category.name}</Link></li>)}
          </ul>
        </nav>
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
