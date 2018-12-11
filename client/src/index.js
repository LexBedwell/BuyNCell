import React from 'react'
import ReactDOM from 'react-dom'
import Provider from 'react-redux'

import store from './store'

class Main extends React.Component{
  render(){
    return (
      <div>
        <h3>This is coming from REACT!</h3>
      </div>
    )
  }
}

ReactDOM.render(<Provider store={store}><Main /></Provider>, document.getElementById('app'))
