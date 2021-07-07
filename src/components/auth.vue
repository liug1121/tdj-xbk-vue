<template>
  <div>
    <!-- <span @click="toGetWXCode">登录</span> -->
  </div>
</template>

<script>
export default {
  // 生命周期函数
  created () {
    const token = ''
    if (!token) {
      const code = this.getUrlKey('code') // 截取code
      if (code === null || code === '' || code === undefined) {
        const urlNow = encodeURIComponent(window.location.href)
        const appid = 'wx7b2ff15843262832'
        const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${urlNow}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
        window.location.href = url
      } else {
        this.$axios({
          method: 'GET',
          url: `http://xbk.tdj.cn/wechat/v1.0/users/login?channelId=1&code=${code}`
        }).then(res => {
          this.token = res.data.token
          sessionStorage.setItem('token', this.token)
          const murl = 'http://xbk.tdj.cn'
          const url = sessionStorage.getItem('now_url')
          window.location.replace(murl + '/#' + url)
        })
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    // 截取code
    getUrlKey (name) { // 获取url 参数
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [''])[1].replace(/\+/g, '%20')) || null
    }
  }
}
</script>
