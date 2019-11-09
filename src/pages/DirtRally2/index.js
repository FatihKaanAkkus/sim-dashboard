import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.sass'
import Content from '../../components/Content'

class DirtRally2 extends Component {
  componentDidMount = () => {
    const { title } = this.props
    document.title = title
  }

  componentWillUnmount = () => {}

  shouldComponentUpdate = () => {
    return true
  }

  render = () => {
    const { m_speed, m_gear, m_engineRate } = this.props
    return (
      <Content name="dirtrally2">
        <div>{m_speed}</div>
        <div>{m_gear}</div>
        <div>{m_engineRate}</div>
      </Content>
    )
  }
}

export default connect(state => state.dirtrally2)(DirtRally2)
