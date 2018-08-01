import { get, post } from '../../../util/request'

export const getList = params => {
  return get('/list.json', {
    params: params
  })
}

export const getItem = params => {
  return get('/detail.json', {
    params: params
  })
}

export const addItem = data => {
  return post('/add.json', data)
}

export const editItem = data => {
  return post('/edit.json', data)
}

export const deleteItem = data => {
  return post('/delete.json', data)
}
