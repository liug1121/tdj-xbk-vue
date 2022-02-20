<template>
  <!-- 设置 -->
  <div class="activate_content">
    <!-- <v-header :headerName="headerName"></v-header> -->
    <div class="box-card">
      <div class="settingList">
        <div class="settingTitle">iccid后7位</div>
        <div class="settingContent">{{orderDetails.iccid}}</div>
      </div>
      <div class="settingList">
        <div class="settingTitle">卡号</div>
        <div class="settingContent">{{orderDetails.phone}}</div>
      </div>
      <div class="settingList">
        <div class="settingTitle">卡套餐</div>
        <div class="settingContent">{{orderDetails.packageName}}</div>
      </div>
      <div class="settingList">
        <div class="settingTitle">支付金额</div>
        <div class="settingContent">{{orderDetails.price}}元</div>
      </div>
    </div>
    <van-button type="info" round size="large" color="#FFBA27" style="height:42px;" @click="toPay">去支付</van-button>
  </div>
</template>

<script>
// import vHeader from '../header.vue'
// import imageUrls from 'common/images/icon-user.png'
import API from 'api/saler'
export default {
  data () {
    return {
        orderId: '',
        orderDetails: {}
    }
  },
  components: {
    // vHeader
  },
  mounted() {
    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL)
    })
  },
  created() {
      this.orderId = this.$route.query.orderId
      this.getOrderDetail()
  },
  methods: {
      toPay () {
        this.$dialog.confirm({
            title: '提醒',
            message: '确认支付吗'
        }).then(() => {
            this.order2Payed()
        }).catch(() => {
        })
      },
      order2Payed () {
        var params = {}
        params.orderId = this.orderId
        API.apiOrderPayed(params).then(res => {
            if (res.resultCode === 0) {
                // this.$toast('支付成功')
                this.$router.push({
                    path: '/SalerPaySuccess',
                    query: { orderId: this.orderId }
                })
            } else {
                this.$toast(res.resultInfo)
            }
        })
      },
      getOrderDetail () {
          var params = {}
          params.orderId = this.orderId
          API.apiGetOrderDetail(params).then(res => {
              if (res.resultCode === 0) {
                  this.orderDetails = res.data
              } else {
                  this.$toast(res.resultInfo)
              }
          })
      }
  }
}
</script>
<style lang="less" scoped>
@import url(../../common/css/setting.less);
</style>
