import React, { Component, Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import store, { history } from './store/'
import { withRouter } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import * as serviceWorker from './serviceWorker'
import './assets/styles/app.sass'
// Containers
import Main from './containers/Main'
import Splash from './containers/Splash'
// Components
import Routing from './components/Routing'
import Sidebar from './components/Sidebar'
// Utils
import WebSocket from './utils/websocket'
// Actions
import { registerKeyboardShortcuts } from './store/actions/app'

new WebSocket()

class App extends Component {
  componentDidMount() {
    registerKeyboardShortcuts()
  }

  render() {
    const { isSplash } = this.props
    return (
      <Fragment>
        {isSplash ? (
          <Splash />
        ) : (
          <Main>
            <Sidebar />
            <Routing />
          </Main>
        )}
      </Fragment>
    )
  }
}

App = withRouter(connect(state => state.app)(App))

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
