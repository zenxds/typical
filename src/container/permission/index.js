import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observer, inject } from "mobx-react"

import permission from './permission'

@permission
class Page extends Component {
  render() {
    return (
      <div>
        有权限才能看的内容
      </div>
    )
  }
}

export default Page
