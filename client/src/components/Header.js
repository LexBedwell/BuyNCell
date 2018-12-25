import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {_setAuth} from '../actions/auth'

// eslint-disable-next-line react/prefer-stateless-function
class Header extends React.Component{
  render(){
    if (!this.props){
      return null
    }
    return (
      <div className="container-fluid p-3">
        <div className="row text-right">
            <div className="dropdown col-2 align-self-center">
              <button className="btn btn-light btn-sm dropdown-toggle float-left" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Menu</button>
              <div className="dropdown-menu dropdown-primary">
                <Link className ="dropdown-item" to="/">Home</Link>
                <Link className ="dropdown-item" to="/products">Products</Link>
                <Link className="dropdown-item" to="/cart">Cart</Link>
                {
                  localStorage.getItem('token') ? (
                    <Link className="dropdown-item" to="/orderhistory">Orders</Link>
                    ) : (
                    ''
                    )
                }
                <div className="dropdown-divider"></div>
                {
                  this.props.auth.githubUserId ? (
                    <button className="dropdown-item" onClick={() => {this.props.logout(); this.props.history.push('/')}}>Logout</button>
                  ) : (
                    <a href="/api/auth/github" className="dropdown-item">Login with Github</a>
                  )
                }
              </div>
            </div>
            {
                  this.props.auth.githubUserId ? (
                    <div className="col-10 align-self-center">
                    <h6>Hello <strong>{this.props.auth.githubUserId}</strong>!</h6>
                    </div>
                  ) : (
                    ''
                  )
                }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(_setAuth({}))
      window.localStorage.removeItem('token')
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
