
import React from 'react'
import {connect} from 'react-redux'

// eslint-disable-next-line react/prefer-stateless-function
class ProductList extends React.Component{
  render(){
    return (
      <div className="container w-75 px-5 pt-4">
        <h4 className="text-dark"><strong>Categories</strong></h4>
            {this.props.categories.map( category => (
              <div key={category.id} className="pt-3">
                <div className="card-deck">
                  {category.products.map( product => (
                    <div key={product.id} className="card border-dark clickable mb-3" style={{maxWidth: '20rem'}} onClick={() => this.props.history.push(`/products/${product.id}`)}>
                      <div className="card-header">{category.name}</div>
                      <img className="card-img-top" src={product.photo} alt="Card image cap" />
                        <div className="card-body text-dark">
                          <h6 className="card-title">{product.name}</h6>
                          <p className="card-text">${product.price}</p>
                        </div>
                    </div>
                  ))}
                </div>

              </div>
            ))}
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
