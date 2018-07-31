import request from '../../../util/request'

export const getList = params => {
  return request({
    url: '/list.json',
    params
  })
}

export const getItem = params => {
  return request({
    url: '/detail.json',
    params
  })
}

export const addItem = params => {
  return request({
    method: 'post',
    url: '/add.json',
    data: params
  })
}

export const editItem = params => {
  return request({
    method: 'post',
    url: '/edit.json',
    data: params
  })
}

export const deleteItem = params => {
  return request({
    method: 'post',
    url: '/delete.json',
    data: params
  })
}
