import React from 'react'
import {connect} from 'react-redux'

class CategoryDetail extends React.Component{
  render(){
    const {selectedCategory} = this.props
    if (!selectedCategory){
      return null
    }
    return (
      <div>
        <h3>{selectedCategory.name}</h3>
        <ul>
          {selectedCategory.products.map( product => <li key={product.id}>{product.name}</li>)}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const selectedCategory = state.categories.filter( category => category.id === ownProps.match.params.categoryId * 1)
  return {selectedCategory: selectedCategory[0]}
}

export default connect(mapStateToProps)(CategoryDetail)
