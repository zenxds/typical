import { observable, action } from "mobx"
import request from '../../../util/request'

class Store {
  @observable hasPermission = false

  constructor() {

  }

  @action
  merge = (obj={}) => {
    Object.assign(this, obj)
  }
}

export default new Store()
