import React from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import routes from '../../routes'
import './index.sass'

const Routing = ({ location }) => {
  return (
    <section className="routing">
      <Switch location={location}>
        {routes.map((route, key) => {
          return (
            <Route
              exact
              key={key}
              path={route.path}
              render={props => <route.content {...props} title={route.title} />}
            />
          )
        })}
      </Switch>
    </section>
  )
}

export default withRouter(Routing)
