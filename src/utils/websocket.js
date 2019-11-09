import config from '../config'
import ReconnectingWebSocket from 'reconnectingwebsocket'
import store from '../store'

const dispatch = store.dispatch

class WebSocket {
  constructor() {
    console.log(`ws://${config.udp.ip}:${config.udp.port}`)
    this.socket = new ReconnectingWebSocket(
      `ws://${config.udp.ip}:${config.udp.port}`
    )
    // register listeners
    this.openListener()
    this.messageListener()
    this.errorListener()
    this.closeListener()
  }

  openListener = () => {
    this.socket.onopen = () => {
      console.log('Web socket opened!')
      dispatch({ type: 'HIDE_SPLASH' })
    }
  }

  messageListener = () => {
    this.socket.onmessage = message => {
      dispatch({ type: 'MESSAGE_RECEIVED', payload: JSON.parse(message.data) })
    }
  }

  errorListener = () => {
    this.socket.onerror = error => {
      console.error(error)
    }
  }

  closeListener = () => {
    this.socket.onclose = () => {
      console.error('Web socket closed!')
    }
  }
}

export default WebSocket
