<template>
  <div class="applySuccess_info">
    <div class="bgImg"></div>
    <div class="de-line"></div>
    <!-- 成功订单显示 -->
    <div class="success-order-box" v-for="(item, id) in detalhes" :key="id">
      <div class="order-list">
        <span class="mint-cell-title">加油包id：</span>
        <span class="mint-cell-text">{{item.addPackageId}}</span>
      </div>
      <div class="order-list">
        <span class="mint-cell-title">加油包名称：</span>
        <span class="mint-cell-text">{{item.addPackageName}}</span>
      </div>
      <div class="order-list">
        <span class="mint-cell-title">加油包价格：</span>
        <span class="mint-cell-text">{{item.price}}元</span>
      </div>
      <div class="order-list">
        <span class="mint-cell-title">加油包类型：</span>
        <span class="mint-cell-text" v-if="item.type === 0">省内流量</span>
        <span class="mint-cell-text" v-else-if="item.type === 1">全国流量</span>
        <span class="mint-cell-text" v-else-if="item.type === 2">短信</span>
        <span class="mint-cell-text" v-else>语音</span>
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
          this.detalhes = res.data.addPackagesInfo
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
      height: 30px;
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
        vertical-align: middle;
        color: inherit;
      }
    }
  }
}
</style>
