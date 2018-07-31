import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observer, inject } from "mobx-react"

import * as actions from './action'

import List from './component/List'

class Page extends Component {
  render() {
    return (
      <div>
        <List actions={actions} />
      </div>
    )
  }
}

export default Page
