<template>
  <!-- 我的订单 -->
  <div class="orderCard_info">
    <!-- list -->
    <div class="box-card">
      <div class="seeorder-list" v-for="(item,id) in ordersList" :key="id">
        <div class="seeOrderIcon">
          <img src="../../common/images/icon-card.png" alt="">
        </div>
        <div v-if="item.type ==='0'" class="orderListTitle">
          <span>{{item.packageName}}</span>
          <span>套餐订购</span>
        </div>
        <div v-else class="orderListTitle">
          <span>{{item.packageName}}</span>
          <span>购买加油包</span>
        </div>
        <div v-show="item.type ==='0'" class="status">
          <span v-if="item.status === 0">未支付</span>
          <span v-if="item.status === 1">支付成功</span>
          <span v-if="item.status === -1">支付失败</span>
          <span v-if="item.status === 5">已开卡</span>
          <span v-if="item.status === 6">已发货</span>
        </div>
        <div class="seeOrderListright">
          <span class="see-details" v-show="item.type">
            <span class="xq" @click="routerTo(item, item.status)">
              详情
            </span>
            <van-icon class="see-icon-xq" name="arrow" />
          </span>
          <span>{{item.orderDate}}</span>
        </div>
      </div>
    </div>
    <!-- <div class="see-order-bottom">
      <span class="problem-feedback"><a>问题反馈</a></span>
      <span class="recharge-amount"><a>充值金额</a></span>
    </div> -->

  </div>
</template>

<script>
import API from 'api/order'
export default {
  data () {
    return {
      ordersList: []
    }
  },
  components: {
  },
  mounted () {
    this.getOrderList()
  },
  methods: {
    getOrderList () {
      API.apiOrderList().then(res => {
        if (res.resultCode === 0) {
          this.ordersList = res.data
          // console.log(this.ordersList)
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    routerTo (row, status) {
      const orderId = row.orderId
      sessionStorage.setItem('orderId', JSON.stringify(orderId))
      if (row.type === '0' && (status === 0 || status === -1)) {
        this.$router.push({
          path: '/applyCardFail',
          query: { orderId: orderId }
        })
      }
      if (row.type === '0' && (status === 1 || status === 5 || status === 6)) {
        this.$router.push({
          path: '/applySuccess',
          query: { orderId: orderId }
        })
      }
      if (row.type === '1') {
        this.$router.push({
          path: '/RefuelingXq',
          query: { orderId: orderId }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../../common/css/seeorder);
</style>
