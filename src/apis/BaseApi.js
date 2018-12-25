import qs from 'qs'
import axios from 'axios'

const clientConfig = {
  baseURL: '/api',
  timeout: 2000
}

export default class BaseApi {
  constructor () {
    this.client = this.getAxiosClient()
  }

  getAxiosClient () {
    const axiosClient = axios.create(clientConfig)
    axiosClient.interceptors.response.use(res => {
      if (res.data.code !== 200) {
        const err = new Error({
          errorCode: res.data.code,
          errorMsg: res.data.message,
          toString () {
            return this.errorMsg
          }
        })
        return Promise.reject(err)
      }
      return Promise.resolve(res.data.data)
    })
    return axiosClient
  }

  request (options) {
    return this.client.request(options)
  }

  get (url, params = {}) {
    const options = {
      url,
      method: 'get',
      params
    }
    return this.request(options)
  }

  post (url, data = {}, type = 'form-data') {
    const options = {
      url,
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    if (type === 'form-data') {
      const form = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        form.append(key, value)
      })
      options.data = form
    } else if (type === 'json') {
      options.headers['Content-Type'] = 'application/json'
      options.data = data
    } else {
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.data = qs.stringify(data)
    }
    return this.request(options)
  }

  put (url, data = {}, type = 'form-data') {
    const options = {
      url,
      method: 'put',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    if (type === 'form-data') {
      const form = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        form.append(key, value)
      })
      options.data = form
    } else if (type === 'json') {
      options.headers['Content-Type'] = 'application/json'
      options.data = data
    } else {
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.data = qs.stringify(data)
    }
    return this.request(options)
  }

  delete (url, params = {}) {
    const options = {
      url,
      method: 'delete',
      params
    }
    return this.request(options)
  }
}
