import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class Header extends React.Component{
  render(){
    return (
      <div>
        <Link to='/products'>Products</Link>
      </div>
    )
  }
}

export default Header
