import React from 'react'
import { FaHome, FaCar } from 'react-icons/fa'
import Homepage from './pages/Homepage'
import DirtRally2 from './pages/DirtRally2'
import DirtRally2Scene from './pages/DirtRally2/Scene'

export default [
  {
    path: '/',
    title: 'Homepage',
    content: Homepage,
    visible: true,
    icon: <FaHome />
  },
  {
    path: '/dirt-rally-2',
    title: 'Dirt Rally 2.0 Dashboard',
    content: DirtRally2,
    visible: true,
    icon: <FaCar />
  },
  {
    path: '/dirt-rally-2/scene',
    title: 'Dirt Rally 2.0 Scene',
    content: DirtRally2Scene,
    visible: true,
    icon: <FaCar />
  }
]
