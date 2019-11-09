import React from 'react'
import './index.sass'

const Content = ({ children, name }) => {
  return <div className={name}>{children}</div>
}

export default Content
