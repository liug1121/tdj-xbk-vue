<template>
  <!-- 卡订购&套餐变更 -->
  <div class="orderCard_info">
    <!-- <v-header :headerName="headerName"></v-header> -->
    <!-- list -->
    <div class="box-card">
      <div class="seeorder-list" v-for="(item,id) in cardOrderList" :key="id">
        <div class="seeOrderIcon">
          <img src="../../common/images/icon-card.png" alt="">
        </div>
        <span class="orderListTitle" v-show="item.type === 0">
          <span>{{item.packageName}}</span>
          <span>充值</span>
        </span>
        <span class="orderListTitle" v-show="item.type === 1">
          <span>{{item.packageName}}</span>
          <span>加油包</span>
        </span>
        <span class="orderListTitle" v-show="item.type === 2">
          <span>{{item.packageName}}</span>
          <span>套餐变更</span>
        </span>
        <span class="orderListTitle" v-show="item.type === 3">
          <span>{{item.packageName}}</span>
          <span>套餐变更</span>
        </span>
        <span class="orderListTitle" v-show="item.type === 4">
          <span>{{item.packageName}}</span>
          <span>用量变动</span>
        </span>
        <span class="orderListTitle" v-show="item.type === 5">
          <span>{{item.packageName}}</span>
          <span>学霸卡费</span>
        </span>
        <span class="orderListTitle" v-show="item.type === 6">
          <span>{{item.orderUUID}}</span>
          <span>{{item.packageName}}</span>
        </span>
        <div class="status">
          <span v-if="item.status === 0">未支付</span>
          <span v-if="item.status === 1">支付成功</span>
          <span v-if="item.status === -1">支付失败</span>
          <span v-if="item.status === 5">已开卡</span>
          <span v-if="item.status === 6">已发货</span>
          <span v-if="item.status === 7">已完成</span>
        </div>
        <div class="seeOrderListright">
          <span class="see-details" v-show="item.type === 6">
            <span class="xq" @click="routerTo(item, item.status)">
              详情
            </span>
            <van-icon class="see-icon-xq" name="arrow" />
          </span>
          <span>{{item.dateTime}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import vHeader from '../header.vue'
export default {
  data () {
    return {
      // headerName: '卡订购&套餐变更',
      cardOrderList: {},
      currChild: {}
    }
  },
  components: {
    // vHeader
  },
  mounted () {
    this.getCardOrderList()
  },
  methods: {
    getCardOrderList () {
      this.currChild = JSON.parse(sessionStorage.getItem('currChild'))
      this.$axios({
        method: 'POST',
        url: 'wechat/v1.0/users/packagechanges',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          cardNo: this.$route.query.cardNo,
          date: this.currChild.date,
          page: 0,
          pageSize: 100
        })
      }).then(res => {
        if (res.data.resultCode === 0) {
          this.cardOrderList = res.data.data
          // console.log(this.cardOrderList)
        } else {
          this.$toast('加载失败')
        }
      })
    },
    routerTo (row, status) {
      // console.log(row)
      const orderId = row.orderUUID
      // alert(orderId)
      sessionStorage.setItem('orderId', JSON.stringify(orderId))
      if (row.type === 6 && (status === 0 || status === -1)) {
        this.$router.push({
          path: '/applyCardFail',
          query: { orderId: orderId }
        })
      }
      if (row.type === 6 && (status === 1 || status === 5 || status === 6 || status === 7)) {
        this.$router.push({
          path: '/applySuccess',
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
