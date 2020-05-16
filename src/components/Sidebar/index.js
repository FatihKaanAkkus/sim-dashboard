import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import routes from '../../routes'
import './index.sass'
import { FaBookmark } from 'react-icons/fa'

const Sidebar = ({ visible }) => {
  return (
    visible && (
      <aside>
        <div
          className="sidebar-title"
          onClick={() => {
            var docElm = document.documentElement
            if (document.fullscreen) {
              if (document.exitFullscreen) {
                document.exitFullscreen()
              } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen()
              } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen()
              } else if (document.msExitFullscreen) {
                document.msExitFullscreen()
              }
            } else {
              if (docElm.requestFullscreen) {
                docElm.requestFullscreen()
              } else if (docElm.mozRequestFullScreen) {
                docElm.mozRequestFullScreen()
              } else if (docElm.webkitRequestFullScreen) {
                docElm.webkitRequestFullScreen()
              } else if (docElm.msRequestFullscreen) {
                docElm.msRequestFullscreen()
              }
            }
          }}>
          <span className="title-icon">
            <FaBookmark />
          </span>
          <span className="title-text">My React App</span>
        </div>
        <nav className="sidebar-navigation">
          {routes
            .filter(route => route.visible)
            .map((route, key) => (
              <NavLink key={key} exact to={route.path} name={route.path}>
                <span className="route-icon">{route.icon}</span>
                <span className="route-title">{route.title}</span>
              </NavLink>
            ))}
        </nav>
      </aside>
    )
  )
}

export default connect(state => {
  return { visible: state.app.sidebarVisible }
})(Sidebar)
