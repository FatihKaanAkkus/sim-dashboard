import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.sass'
import Content from '../../../components/Content'
import ViewerUtil, { setSceneRef, resizeToFit } from '../../../utils/viewer'

class SceneViewer extends Component {
  constructor(props) {
    super(props)
    this.viewer = null
  }

  componentDidMount = () => {
    try {
      this.viewer = new ViewerUtil({ container: 'viewer' })
      setSceneRef(this.viewer)
      resizeToFit()
    } catch (error) {
      console.log(error)
    }
  }

  componentWillUnmount = () => {
    if (this.viewer) {
      this.viewer.removeListener()
    }
    setSceneRef(null)
  }

  shouldComponentUpdate = () => {
    return false
  }

  render = () => {
    return <div id="viewer" className="viewer" />
  }
}

class Scene extends Component {
  componentDidMount = () => {
    const { title } = this.props
    document.title = title
  }

  componentWillUnmount = () => {}

  shouldComponentUpdate = () => {
    return true
  }

  render = () => {
    const {
      m_totalPlayTime, // eslint-disable-line
      m_stageTime, // eslint-disable-line
      m_stageDistance, // eslint-disable-line
      m_stageDistancePercent, // eslint-disable-line
      m_position, // eslint-disable-line
      m_speed, // eslint-disable-line
      m_world, // eslint-disable-line
      m_suspensionPos, // eslint-disable-line
      m_suspensionVel, // eslint-disable-line
      m_wheelSpeed, // eslint-disable-line
      m_input, // eslint-disable-line
      m_gear, // eslint-disable-line
      m_gForceLateral, // eslint-disable-line
      m_gForceLongitudinal, // eslint-disable-line
      m_currentLap, // eslint-disable-line
      m_engineRate, // eslint-disable-line
      m_splitComplete, // eslint-disable-line
      m_sectorTime, // eslint-disable-line
      m_sectorTime2, // eslint-disable-line
      m_brakeTemp, // eslint-disable-line
      m_trackLength, // eslint-disable-line
      m_stageTime2, // eslint-disable-line
      m_maxEngineRate // eslint-disable-line
    } = this.props

    return (
      <Content name="dirtrally2scene">
        <SceneViewer />
      </Content>
    )
  }
}

export default connect(state => state.dirtrally2)(Scene)
