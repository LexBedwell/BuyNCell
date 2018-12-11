import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Header extends React.Component{
  render(){
    return (
      <div>
        <Link to='/products'>Products ({this.props.products.length})</Link>
      </div>
    )
  }
}

const mapStateToProps = ({products}) => {
  return {
    products
  }
}

export default connect(mapStateToProps)(Header)
