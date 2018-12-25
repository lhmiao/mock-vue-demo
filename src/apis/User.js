import BaseApi from './BaseApi'

export default class User extends BaseApi {
  login (data) {
    const url = '/user/login'
    return this.post(url, data)
  }

  logout () {
    const url = '/user/logout'
    return this.get(url)
  }

  query (data) {
    const url = '/user/query'
    return this.get(url, data)
  }
}
