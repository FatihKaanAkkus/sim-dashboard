import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

import appReducer from './reducers/app'
import homepageReducer from './reducers/homepage'
import dirtrally2Reducer from './reducers/dirtrally2'

export const history = createBrowserHistory()

const router = routerMiddleware(history)

const reducers = combineReducers({
  router: connectRouter(history),
  app: appReducer,
  homepage: homepageReducer,
  dirtrally2: dirtrally2Reducer
})

const store = createStore(reducers, compose(applyMiddleware(thunk, router)))

export default store
