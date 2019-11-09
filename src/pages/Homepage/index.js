import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.sass'
import Content from '../../components/Content'

class Homepage extends Component {
  componentDidMount = () => {
    const { title } = this.props
    document.title = title
  }

  componentWillUnmount = () => {}

  shouldComponentUpdate = () => {
    return true
  }

  render = () => {
    return <Content name="homepage">Welcome to the app!</Content>
  }

  initComponent = async () => {}
}

export default connect(state => state.homepage)(Homepage)
