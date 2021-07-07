<template>
  <div>
    <!-- <span @click="toGetWXCode">登录 {{code}}{{token}}</span> -->
    <!-- <div>code：{{code}}</div> -->
    <div>token：{{token}}</div>
  </div>
</template>
<script>
const murl = 'http://xbk.tdj.cn'
const url = localStorage.getItem('now_url')
// import WxAPI from './../api/login.js'
export default {
  data () {
    return {
      token: '',
      code: ''
    }
  },
  created () {
    const token = localStorage.getItem('token')
    if (token === null || token === '') {
      const code = this.getUrlKey('code')
      if (code === null || code === '') {
        // code 为空时，获取 code
        const urlNow = encodeURIComponent(window.location.href)
        const appid = 'wx7b2ff15843262832'
        const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + urlNow + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
        window.location.href = url
      } else {
        this.$axios({
          method: 'GET',
          url: `http://xbk.tdj.cn/wechat/v1.0/users/login?channelId=1&code=${code}`
        }).then(res => {
          this.token = res.data.token
          localStorage.setItem('token', this.token)
        })
      }
    } else {
      window.location.replace(murl + '/#' + url)
    }
    return token
  },
  methods: {
    toGetWXCode () {
      const urlNow = encodeURIComponent(window.location.href)
      // const appid = 'wx7b2ff15843262832'
      const url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7b2ff15843262832&redirect_uri=' + urlNow + '&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
      window.location.href = url
    },
    getUrlKey: function (name) { // 获取url 参数
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [null, ''])[1].replace(/\+/g, '%20')) || null
    }
  }
}
</script>
