<template>
  <div class="applySuccess_info">
    <!-- 申请成功 -->
    <!-- <v-header :headerName="headerName"></v-header> -->
    <!-- <div class="success-zh">
      <van-icon name="checked" size="50" color="#26B5FF" />
    </div> -->
    <div class="bgImg"></div>
    <div class="de-line"></div>
    <!-- 成功订单显示 -->
    <div class="success-order-box">
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
      <div class="order-list">
        <span class="mint-cell-title">订单状态：</span>
        <span class="mint-cell-text">
          <span v-if="detalhes.status === 0">未支付</span>
          <span v-if="detalhes.status === 1">支付成功</span>
          <span v-if="detalhes.status === -1">支付失败</span>
          <span v-if="detalhes.status === 5">已开卡</span>
          <span v-if="detalhes.status === 6">已发货</span>
        </span>
      </div>
    </div>
  </div>

</template>

<script>
// import vHeader from '../header.vue'
// import applySuccess from 'api/applyCard.js'
import API from 'api/order'
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
    background: url('./../../common/images/applgSuccess.png') no-repeat;
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
  }
}
</style>
