import { action } from 'mobx'
import request from 'util/request'
import store from '../store'
import * as constants from '../constant'

class Actions {
  constructor(store) {
    this.store = store
    this.merge = this.merge.bind(this)
  }

  getMsg = () => {
    request({
      url: constants.API_HOME
    })
    .then(data => {
      this.merge({
        msg: data.helloMsg
      })
    })
  }

  @action
  merge(obj={}) {
    Object.assign(this.store, obj)
  }
}

export default new Actions(store)
