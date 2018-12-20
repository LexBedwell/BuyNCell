import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class CategoryDetail extends React.Component{
  render(){
    const {selectedCategory} = this.props
    if (!selectedCategory){
      return null
    }
    return (
      <div className="px-5 py-2">
        <h5 className="text-dark"><strong>{selectedCategory.name}</strong></h5>
        <nav>
          <ul className="pagination pagination-lg">
            {selectedCategory.products.map( product => <li key={product.id} className="page-item"><Link className="page-link" to={`/products/${product.id}`}>{product.name}</Link></li>)}
          </ul>
        </nav>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const selectedCategory = state.categories.filter( category => category.id === ownProps.match.params.categoryId * 1)
  return {selectedCategory: selectedCategory[0]}
}

export default connect(mapStateToProps)(CategoryDetail)
