import Mock from './utils/mock'

Mock.mock('/api/user/login', 'post', options => {
  let { params } = options
  if (params.username && params.password) {
    return {
      data: '',
      code: 200,
      message: '登录成功'
    }
  } else {
    return {
      data: '',
      code: 300,
      message: '账号或密码未输入'
    }
  }
})

Mock.mock('/api/user/logout', 'get', options => {
  return {
    data: '',
    code: 200,
    message: '注销成功'
  }
})

Mock.mock('/api/user/query', 'get', options => {
  return {
    data: options.params,
    code: 200,
    message: 'ok'
  }
})
