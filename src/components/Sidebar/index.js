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
        <div className="sidebar-title">
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

export default connect(state => state.app)(Sidebar)
