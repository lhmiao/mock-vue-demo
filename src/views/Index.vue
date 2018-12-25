<template>
  <div class="index">
    <div class="test1">
      <label>
        用户名：
        <input type="text" v-model="username">
      </label>
      <label>
        密码：
        <input type="password" v-model="password">
      </label>
      <div class="btns">
        <button @click="login">登录</button>
        <button @click="logout">注销</button>
      </div>
    </div>
    <div class="test2">
      <label>
        查询字符串的 key ：
        <input type="text" v-model="key">
      </label>
      <label>
        查询字符串的 value ：
        <input type="text" v-model="value">
      </label>
      <button @click="query">测试带查询字符串的 get 请求</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.test1,
.test2 {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

label {
  margin-bottom: 10px;
}

.test1 label {
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 250px;
}

button:hover {
  cursor: pointer;
}
</style>

<script>
import User from '@/apis/User'

const user = new User()

export default {
  data () {
    return {
      username: '',
      password: '',
      key: '',
      value: ''
    }
  },
  methods: {
    login () {
      const data = {
        username: this.username,
        password: this.password
      }
      user.login(data)
        .then(res => console.log('登录成功'))
        .catch(err => console.error(err))
    },
    logout () {
      user.logout()
        .then(res => console.log('注销成功'))
        .catch(err => console.error(err))
    },
    query () {
      if (this.key === '') {
        alert('请输入key值')
        return
      }
      let key = encodeURIComponent(this.key)
      let value = encodeURIComponent(this.value)
      const data = {
        [key]: value
      }
      user.query(data)
        .then(res => console.log('传递的查询参数为：', res))
        .catch(err => console.error(err))
    }
  }
}
</script>
