import { action } from 'mobx'
import request from '../../../util/request'
import store from '../store'

class Actions {
  constructor(store) {
    this.store = store
    this.merge = this.merge.bind(this)
  }

  @action
  merge(obj={}) {
    Object.assign(this.store, obj)
  }
}

export default new Actions(store)
