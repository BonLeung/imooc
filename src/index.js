import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Link } from 'react-router-dom'
import thunk from 'redux-thunk'
import App from './App'
import { counter } from './index.redux'

const devTools = window.devToolsExtension ? window.devToolsExtension() : () => {}
const store = createStore(counter, compose(
  applyMiddleware(thunk),
  devTools
))

function ErYing(props) {
  return <h1>二营</h1>
}

function QiBingLian(props) {
  return <h1>骑兵连</h1>
}

ReactDOM.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to='/'>一营</Link>
          </li>
          <li>
            <Link to='/erying'>二营</Link>
          </li>
          <li>
            <Link to='/qibinglian'>骑兵连</Link>
          </li>
        </ul>
        <Route path='/' exact component={App} />
        <Route path='/erying' component={ErYing} />
        <Route path='/qibinglian' component={QiBingLian} />
      </div>
    </BrowserRouter>
  </Provider>),
  document.getElementById('root'))
