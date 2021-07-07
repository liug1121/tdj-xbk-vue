<template>
  <div class="applySuccess_info">
    <!-- 申请失败 -->
    <!-- <v-header :headerName="headerName"></v-header> -->
    <div class="bgImg"></div>
    <!-- 失败订单显示 -->
    <div class="de-line"></div>
    <div class="success-order-box">
      <div class="order-list">
        <span class="mint-cell-title">订单状态：</span>
        <span class="mint-cell-text" style="color:red;">
          <span v-if="detalhes.status === 0">未支付</span>
          <span v-if="detalhes.status === 1">支付成功</span>
          <span v-if="detalhes.status === -1">支付失败</span>
          <span v-if="detalhes.status === 5">已开卡</span>
          <span v-if="detalhes.status === 6">已发货</span>
        </span>
      </div>
      <div class="order-list">
        <span class="mint-cell-title">订单编号：</span>
        <span class="mint-cell-text">{{detalhes.uuid}}</span>
      </div>
      <div class="order-list">
        <span class="mint-cell-title">订单时间：</span>
        <span class="mint-cell-text">{{detalhes.create_time}}</span>
      </div>
      <div class="order-list">
        <span class="mint-cell-title">订单套餐：</span>
        <span class="mint-cell-text">{{packageName}}</span>
      </div>
      <div class="order-list">
        <span class="mint-cell-title">订单金额：</span>
        <span class="mint-cell-text">{{detalhes.price}}元</span>
      </div>
      <div class="order-list">
        <span class="mint-cell-title">收件人姓名：</span>
        <span class="mint-cell-text">{{detalhes.name}}</span>
      </div>
      <div class="order-list">
        <span class="mint-cell-title">联系方式：</span>
        <span class="mint-cell-text">{{detalhes.phone}}</span>
      </div>
      <div class="order-list">
        <span class="mint-cell-title">配送地址：</span>
        <span class="mint-cell-text">{{detalhes.provinceName}}{{detalhes.cityName}}{{detalhes.districtName}}{{detalhes.address}}</span>
      </div>
      <div class="order-list">
        <span class="mint-cell-title">套餐归属地：</span>
        <span class="mint-cell-text">{{detalhes.packageProvinceName}}</span>
      </div>
      <div class="orderButton">
        <van-button type="info" color="#FFBA27" style="height:30px;" @click="payIt">支付</van-button>
      </div>

    </div>
  </div>
</template>
<script>
// import vHeader from '../header.vue'
import API from 'api/order'
// import Toast from 'vant'
export default {
  data () {
    return {
      // headerName: '订单详情',
      detalhes: {},
      packageName: '',
      netTotal: '',
      voiceTotal: '',
      smsTotal: '',
      orderId: ''
    }
  },
  components: {
    // vHeader
  },
  created () {
    this.orderId = this.$route.query.orderId
    this.getOrderXQ()
  },
  methods: {
    getOrderXQ () {
      const orderUUID = this.orderId
      API.apiOrderXQ(orderUUID).then(res => {
        if (res.resultCode === 0) {
          this.detalhes = res.data
          const netTotal = this.detalhes.pakage.net_total
          const voiceTotal = this.detalhes.pakage.voice_total
          const smsTotal = this.detalhes.pakage.sms_total
          const packageProvinceName = this.detalhes.packageProvinceName
          if (netTotal === 0 || netTotal === null || netTotal === undefined) {
            this.packageName = `语音${voiceTotal}分钟+短信${smsTotal}条`
          } else if (voiceTotal === 0 || voiceTotal === null || voiceTotal === undefined) {
            this.packageName = `短信${smsTotal}条+${packageProvinceName}流量${netTotal}M`
          } else if (smsTotal === 0 || smsTotal === null || smsTotal === undefined) {
            this.packageName = `语音${voiceTotal}分钟+${packageProvinceName}流量${netTotal}M`
          } else {
            this.packageName = `语音${voiceTotal}分钟+短信${smsTotal}条+${packageProvinceName}流量${netTotal}M`
          }
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    payIt () {
      API.apiOrderOrderId().then(res => {
        const orderId = res.data
        const data = {
          body: '购买学霸卡',
          out_trade_no: res.data,
          total_fee: Number(this.detalhes.price) * 100
        }
        API.apiWXprepay(data).then(res => {
          if (res.resultCode === 0) {
            this.weixinTradePay(res.data, orderId, this.detalhes.uuid)
          } else {
            this.$toast(res.resultInfo)
          }
        })
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
    // 发起支付
    weixinTradePay (obj, orderId, id) {
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
              const data = {
                orderId: orderId,
                uuid: id
              }
              API.apiOrdersPayedStatus(data).then(res => {
                if (res.resultCode === 0) {
                  self.$toast('支付成功！')
                } else {
                  self.$toast(res.resultInfo)
                }
              })
            } else {
              self.$toast('支付失败')
            }
          }
        )
      })
    }
  }
}
</script>

<style lang="less" scoped>
.applySuccess_info {
  width: 100%;
  height: 100%;
  position: relative;
  background: #fff;
  .bgImg {
    width: 3rem;
    height: 3rem;
    margin: 1rem auto 0;
    background: url('./../../common/images/audit-failed.png') no-repeat;
    background-size: 100%;
  }
  .de-line {
    width: 95%;
    margin: 0.5rem auto 0.2rem;
    border-top: 1px solid #e3e3e3;
  }
  .success-order-box {
    font-size: 0.3rem;
    padding: 10px 20px 20px 20px;
    .order-list {
      height: auto;
      line-height: 30px;
      width: 100%;
      font-size: 0.28rem;
      display: flex;
      .mint-cell-title {
        width: 1.8rem;
        color: #b5b5b5;
        text-align: center;
      }
      .mint-cell-text {
        flex: 1;
        vertical-align: middle;
        color: inherit;
      }
    }
    .orderButton {
      line-height: 35px;
      text-align: right;
    }
  }
}
</style>
