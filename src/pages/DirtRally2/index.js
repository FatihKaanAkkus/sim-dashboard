import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.sass'
import Content from '../../components/Content'
import moment from 'moment'

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

    let stageTime = moment.utc(moment.duration(m_stageTime, 'seconds').asMilliseconds()).format('mm:ss:SSS')

    return (
      <Content name="dirtrally2">
        <div className="rev-leds"></div>
        <div>{stageTime}</div>
        <div className="gear-speed">
          <div />
          <div className="gear">{m_gear}</div>
          <div className="speed">{m_speed.Magnitude}</div>
        </div>
        <div className="rev">{m_engineRate}</div>
        <div>{m_stageDistancePercent}</div>
        <div>
          <div>{m_position.x}</div>
          <div>{m_position.y}</div>
          <div>{m_position.z}</div>
        </div>
        <div>
          <div>{m_brakeTemp.FL}</div>
          <div>{m_brakeTemp.FR}</div>
          <div>{m_brakeTemp.RL}</div>
          <div>{m_brakeTemp.RR}</div>
        </div>
      </Content>
    )
  }
}

export default connect(state => state.dirtrally2)(DirtRally2)
