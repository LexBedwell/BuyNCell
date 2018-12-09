import React from 'react'
import ReactDOM from 'react-dom'

class Main extends React.Component{
  render(){
    return (
      <div>
        <h3>This is coming from REACT!</h3>
      </div>
    )
  }
}

ReactDOM.render(<Main />, document.getElementById("app"))
