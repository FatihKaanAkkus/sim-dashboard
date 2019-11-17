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
      m_speed,
      m_suspensionPos,
      m_input,
      m_gear,
      m_engineRate,
      m_sectorTime,
      m_sectorTime2,
      m_brakeTemp,
      m_tyrePressure,
      m_trackLength,
      m_stageTime,
      m_maxEngineRate
    } = this.props

    let sectorTime = moment
      .utc(moment.duration(m_sectorTime, 'seconds').asMilliseconds())
      .format('HH:mm:ss')
    let sectorTime2 = moment
      .utc(moment.duration(m_sectorTime2, 'seconds').asMilliseconds())
      .format('HH:mm:ss')
    let stageTime = moment
      .utc(moment.duration(m_stageTime, 'seconds').asMilliseconds())
      .format('HH:mm:ss')

    return (
      <Content name="dirtrally2">
        <div className="rev-leds"></div>
        <div>{sectorTime}</div>
        <div>{sectorTime2}</div>
        <div>{stageTime}</div>
        <div className="gear-speed">
          <div />
          <div className="gear">{m_gear}</div>
          <div className="speed">{m_speed}</div>
        </div>
        <div className="rev">{m_engineRate}</div>
      </Content>
    )
  }
}

export default connect(state => state.dirtrally2)(DirtRally2)
