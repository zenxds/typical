import React, { Component } from 'react'
import { autorun } from 'mobx'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'

/**
 * 检查是否有应用权限
 */
export default (WrappedComponent) => {

  @inject('permissionStore')
  @withRouter
  @observer
  class CheckPermission extends Component {

    constructor(props, context) {
      super(props, context)

      this.store = this.props.permissionStore
    }

    componentDidMount() {
      setTimeout(() => {
        this.store.merge({
          hasPermission: true
        })
      }, 2000)
    }

    render() {
      const hasPermission = this.store.hasPermission
      return hasPermission ? <WrappedComponent {...this.props} /> : null
    }
  }

  return CheckPermission
}
