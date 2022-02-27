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
      <div class="settingList">
        <div class="settingTitle">微信支付单号</div>
        <div class="settingContent">{{orderDetails.payedWechatNo}}</div>
      </div>
      <div class="settingList">
        <div class="settingTitle">联系姓名</div>
        <div class="settingContent">{{orderDetails.orderName}}</div>
      </div>
      <div class="settingList">
        <div class="settingTitle">联系电话</div>
        <div class="settingContent">{{orderDetails.orderPhone}}</div>
      </div>
      <div class="settingList">
        <div class="settingTitle">地址</div>
        <div class="settingContent">{{orderDetails.orderAddress}}</div>
      </div>
      <div class="settingList">
        <div class="settingTitle">订单时间</div>
        <div class="settingContent">{{orderDetails.orderDateTime}}</div>
      </div>
      <div class="settingList">
        <div class="settingTitle">押金金额</div>
        <div class="settingContent">{{orderDetails.cash_pledge}}元</div>
      </div>
      <div class="settingList">
        <div class="settingTitle">押金微信单号</div>
        <div class="settingContent">{{orderDetails.pledgePayedWechatNo}}</div>
      </div>
      <div class="settingList">
        <div class="settingTitle">押金退还状态</div>
        <div v-if="orderDetails.returnPledgeStatus === 0" class="settingContent"><span class="to-pay" @click="applyReturn">申请退押金</span></div>
        <div v-if="orderDetails.returnPledgeStatus === 1" class="settingContent">押金退还中</div>
        <div v-if="orderDetails.returnPledgeStatus === 2" class="settingContent">押金已退还</div>
        <div v-if="orderDetails.returnPledgeStatus === 3" class="settingContent">不能退押金</div>
        <div v-if="orderDetails.returnPledgeStatus === 4" class="settingContent">无押金</div>
      </div>
      <div class="settingList">
        <div class="settingTitle">操作时间</div>
        <div class="settingContent">{{orderDetails.pledgeReturnOptTime}}</div>
      </div>
      <div class="settingList">
        <div class="settingTitle">说明</div>
        <div class="settingContent">{{orderDetails.returnPledgeComment}}</div>
      </div>
    </div>
    <van-button type="info" round size="large" color="#FFBA27" style="height:42px;" @click="toBack">返回</van-button>
    <div v-show="loadingShow" class="loading">
      <van-loading type="spinner" color="#FDAB16" />
    </div>
  </div>
</template>

<script>
// import vHeader from '../header.vue'
// import imageUrls from 'common/images/icon-user.png'
import API from 'api/saler'
export default {
  data () {
    return {
        loadingShow: false,
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
      toBack () {
        this.$router.push({
            path: '/SalerOrder'
        })
      },
    //   toPay () {
    //     this.$dialog.confirm({
    //         title: '提醒',
    //         message: '确认支付吗'
    //     }).then(() => {
    //         this.order2Payed()
    //     }).catch(() => {
    //     })
    //   },
    //   order2Payed () {
    //     var params = {}
    //     params.orderId = this.orderId
    //     API.apiOrderPayed(params).then(res => {
    //         if (res.resultCode === 0) {
    //             // this.$toast('支付成功')
    //             this.$router.push({
    //                 path: '/SalerPaySuccess',
    //                 query: { orderId: this.orderId }
    //             })
    //         } else {
    //             this.$toast(res.resultInfo)
    //         }
    //     })
    //   },
      getOrderDetail () {
          var params = {}
          params.orderId = this.orderId
          this.loadingShow = true
          API.apiGetOrderDetail(params).then(res => {
              if (res.resultCode === 0) {
                  this.orderDetails = res.data
                  this.loadingShow = false
              } else {
                  this.$toast(res.resultInfo)
                  this.loadingShow = false
              }
          })
      },
      applyReturn () {
        this.$dialog.confirm({
            title: '提醒',
            message: '确认申请退押金吗'
        }).then(() => {
            var params = {}
            params.orderId = this.orderId
            API.apiApplyPledgeReturn(params).then(res => {
              if (res.resultCode === 0) {
                  this.getOrderDetail()
                  this.loadingShow = false
              } else {
                  this.$toast(res.resultInfo)
                  this.loadingShow = false
              }
          })
        }).catch(() => {
        })
      }
  }
}
</script>
<style lang="less" scoped>
@import url(../../common/css/setting.less);
.to-pay{
    color: #FFBA27;
}
</style>
