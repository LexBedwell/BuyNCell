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
                  localStorage.getItem('token') ? (
                    <button className="dropdown-item" onClick={() => {this.props.logout(); this.props.history.push('/')}}>Logout</button>
                  ) : (
                    <a href="/api/auth/github" className="dropdown-item">Login with Github</a>
                  )
                }
              </div>
            </div>
            {
                  localStorage.getItem('token') ? (
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

/*
        <div className="col-2">
            <Link className ="btn btn-outline-success btn-sm" to='/'>Home</Link>
          </div>
          <div className="col-2">
            <Link className ="btn btn-outline-success btn-sm" to='/products'>Products</Link>
          </div>
          <div className="col-2">
            <Link className="btn btn-outline-success btn-sm" to='/cart'>Cart</Link>
          </div>
          <div className="col-2">
            {
            localStorage.getItem('token') ? (
              <div>
                <Link className="btn btn-outline-success btn-sm" to='/orderhistory'>Orders</Link>
              </div>
            ) : (
              ''
            )
          }
          </div>
          <div className="col-4 d-flex flex-row-reverse">
          {
            localStorage.getItem('token') ? (
              <div>
                <h6 className="text-dark">Hello <strong>{this.props.auth.githubUserId}</strong>! <button className="btn btn-outline-danger btn-sm" onClick={() => {this.props.logout(); this.props.history.push('/')}}>Logout</button></h6>
              </div>
            ) : (
              <a href='/api/auth/github' className="btn btn-outline-success btn-sm">Login with Github</a>
            )
          }
          </div>
*/