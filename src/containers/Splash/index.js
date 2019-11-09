import React from 'react'
import { connect } from 'react-redux'
import CircleLoader from 'react-spinners/CircleLoader'
import './index.sass'
import Content from '../../components/Content'

const Splash = props => {
  return (
    <Content name="splash">
      <div className="splash-loader">
        <CircleLoader color={'#f50057'} />
      </div>
    </Content>
  )
}

export default connect(state => state.app)(Splash)
