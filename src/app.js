import { Component } from 'react'
import {
  // BrowserRouter as Router
  HashRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import { hot } from 'react-hot-loader'

import './less/antd.less'
import styles from './less/app.less'

import Header from 'component/Header'
import Menu from 'component/Menu'
import Dynamic from './dynamic'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="app-root">
          <Header />
          <div className="app-wrapper">
            <div className="app-menu">
              <Menu />
            </div>
            <div className="app-content">
              <Switch>
                <Dynamic exact path="/" load={require('bundle-loader?lazy!./container/home')} />
                <Dynamic exact path="/add" load={require('bundle-loader?lazy!./container/addList')} />
                <Dynamic exact path="/search" load={require('bundle-loader?lazy!./container/searchList')} />
                <Dynamic exact path="/animate" load={require('bundle-loader?lazy!./container/animateList')} />
                <Dynamic exact path="/permission" load={require('bundle-loader?lazy!./container/permission')} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default hot(module)(App)
