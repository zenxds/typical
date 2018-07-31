import axios from 'axios'

export default (config={}) => {
  config = Object.assign({
    withCredentials: true,
    timeout: 30 * 1000
  }, config)

  return axios(config).then((response) => {
    const { success, data, msg } = response.data || {}

    if (success) {
      return data
    } else {
      throw new Error(msg || 'request error')
    }
  })
}
