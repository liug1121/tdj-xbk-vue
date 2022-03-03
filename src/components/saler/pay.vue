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
      <div class="note">以下为选填客户信息</div>
      <div class="settingList">
        <!-- <div class="settingTitle">备注</div> -->
        <van-field label="联系人" v-model="orderName" class="send-code-item" placeholder="请输入联系人姓名"/>
      </div>
      <div class="settingList">
        <!-- <div class="settingTitle">备注</div> -->
        <van-field label="联系电话" v-model="orderPhone" class="send-code-item" placeholder="请输入联系人电话"/>
      </div>
      <div class="settingList">
        <!-- <div class="settingTitle">备注</div> -->
        <van-field label="联系地址" v-model="orderAddress" class="send-code-item" placeholder="请输入联系人地址"/>
      </div>

    </div>
    <van-button type="info" round size="large" color="#FFBA27" style="height:42px;" @click="toPay">去支付</van-button>
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
        orderName: '',
        orderPhone: '',
        orderAddress: '',
        orderComment: '',
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
      toPay () {
        this.$dialog.confirm({
            title: '提醒',
            message: '确认支付吗'
        }).then(() => {
            API.apiOrderOrderId().then(res => {
              console.log('apiOrderOrderId:' + JSON.stringify(res))
              const orderId = res.data
              const data = {
                body: '支付押金',
                out_trade_no: res.data,
                total_fee: Number(this.orderDetails.price) * 100
                // total_fee: Number(0.01) * 100
              }
              console.log('orderId:' + orderId)
              console.log('orderId:' + JSON.stringify(data))
              API.apiWXprepay(data).then(res => {
                if (res.resultCode === 0) {
                    console.log('apiWXprepay:' + JSON.stringify(res.data))
                  this.weixinTradePay(res.data, orderId, () => {
                    this.order2Payed(orderId)
                  }, () => {
                      this.$router.push({
                      path: '/SalerPayFaild',
                      query: { orderId: orderId }
                })
                  })
                } else {
                  this.$toast(res.resultInfo)
                }
              })
            })
            // this.order2Payed()
        }).catch(() => {
        })
      },
      weixinJSBridgeReady (callback) {
        // 如果jsbridge已经注入则直接调用
        if (typeof WeixinJSBridge === 'undefined') {
            if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', callback, false)
            } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', callback)
            document.attachEvent('onWeixinJSBridgeReady', callback)
            }
        } else {
            callback && callback()
        }
       },
      weixinTradePay (obj, orderId, $routerFun, $routerFaildFun) {
        console.log('obj:' + obj)
        console.log('orderId:' + orderId)
        console.log('$routerFun:' + $routerFun)
        console.log('$routerFaildFun:' + $routerFaildFun)
        const self = this
        this.weixinJSBridgeReady(function () {
            window.WeixinJSBridge.invoke(
            'getBrandWCPayRequest',
            {
                appId: obj.appId, // 公众号名称，由商户传入
                timeStamp: obj.timeStamp, // 时间戳，自1970年以来的秒数
                nonceStr: obj.nonceStr, // 随机串
                package: obj.pkg,
                signType: obj.signType, // 微信签名方式:
                paySign: obj.paySign // 微信签名
            },
            function (result) {
                if (result.err_msg === 'get_brand_wcpay_request:ok') {
                    console.log('orderId:' + orderId)
                $routerFun()
                } else if (result.err_msg === 'get_brand_wcpay_request:cancel') {
                self.$dialog.confirm({
                    title: '提醒',
                    message: '是否放弃本次支付？',
                    confirmButtonText: '确定',
                    cancelButtonText: '继续支付'
                }).then(() => {
                    $routerFaildFun()
                }).catch(() => {
                })
                } else {
                self.$toast('支付失败')
                }
            }
            )
        })
        },
      order2Payed (payedTradeNo) {
        var params = {}
        params.orderId = this.orderId
        params.payedTradeNo = payedTradeNo
        params.orderComment = this.orderComment
        params.orderName = this.orderName
        params.orderPhone = this.orderPhone
        params.orderAddress = this.orderAddress
        this.loadingShow = true
        API.apiOrderPayed(params).then(res => {
            if (res.resultCode === 0) {
                this.loadingShow = false
                // this.$toast('支付成功')
                this.$router.push({
                    path: '/SalerPaySuccess',
                    query: { orderId: this.orderId }
                })
            } else {
                this.loadingShow = false
                this.$toast(res.resultInfo)
            }
        })
      },
      getOrderDetail () {
          var params = {}
          params.orderId = this.orderId
          this.loadingShow = true
          API.apiGetOrderDetail(params).then(res => {
              if (res.resultCode === 0) {
                  this.loadingShow = false
                  this.orderDetails = res.data
              } else {
                  this.loadingShow = false
                  this.$toast(res.resultInfo)
              }
          })
      }
  }
}
</script>
<style lang="less" scoped>
@import url(../../common/css/setting.less);
.note{
    color: red;
    font-size: 15px;
    margin-top: 5px;
    margin-left: 10px;
}
</style>
