<template>
  <!-- 绑定学霸卡 -->
  <div class="activate_content">
    <div class="notice">支付成功</div>
    <div class="activate_con">
      <van-button class="activate_con_item" type="info" round size="large" color="#FFBA27" style="height:42px;" @click="toStock">查看库存</van-button>
      <van-button class="activate_con_item" type="info" round size="large" color="#FFBA27" style="height:42px;" >查看订单</van-button>
    </div>
  </div>
</template>

<script>
// import imageUrls from 'common/images/person.png'
// import FileSelect from './selectFileBtn.vue'
// import wx from 'weixin-jsapi'
// import { Toast } from 'vant'
// import API from 'api/activation'
export default {
  data () {
    return {
      orderId: ''
    }
  },
  components: {
    // FileSelect
  },
  created () {
    this.orderId = this.$route.query.orderId
  },
  mounted() {
    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL)
    })
  },
  methods: {
      toStock () {
        this.$router.push({
            path: '/SalerSock'
        })
      }
  }
}
</script>

<style lang="less" scoped>
@import url(../../common/css/activation.less);
.notice{
    font-size: 20px;
    margin-left: 40%;
    margin-top:30%;
    margin-bottom: 10%;
    color: #ed7020;
}
.activate_con{
    display: flex;
}
.activate_con_item{
    flex: 1;
    margin: 10px;
}
</style>
