import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

import {_setAuth} from '../actions/auth'

class Header extends React.Component{
  render(){
    if(!this.props){
      return null
    }
    return (
      <div className="container p-1">
        <div className="row">
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