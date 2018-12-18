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
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-3">
            <Link to='/products'>Products</Link>
          </div>
          <div className="col-3">
            <Link to='/cart'>Cart</Link>
          </div>
          <div className="col-4">
          {
            localStorage.getItem('token') ? (
              <div>
                <h6>Hello {this.props.auth.githubUserId}! <button onClick={() => {this.props.logout(); this.props.history.push('/')}}>Logout</button></h6>
              </div>
            ) : (
              <a href='/api/auth/github'>Login with Github</a>
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