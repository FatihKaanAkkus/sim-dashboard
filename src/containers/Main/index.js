import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.sass'

class Main extends Component {
  render = () => {
    return <main className="internal">{this.props.children}</main>
  }
}

export default connect()(Main)
