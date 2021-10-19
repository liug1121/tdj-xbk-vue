<template>
  <!-- 充值扣费 -->
  <div class="orderCard_info">
    <!-- <v-header :headerName="headerName"></v-header> -->

    <!-- list -->
    <div class="box-card">
      <div class="seeorder-list" v-for="(item,id) in rechargeList" :key="id">
        <div class="seeOrderIcon">
          <img src="../../common/images/icon-card.png" alt="">
        </div>
        <span class="orderListTitle">
          <span v-if="item.payType === 0">充值</span>
          <span v-else-if="item.payType === 1">加油包费</span>
          <span v-else-if="item.payType === 5">卡费</span>
          <span v-else-if="item.payType === 6">套餐费</span>
          <span v-else>账户冻结</span>
          <span>{{item.payFor}}</span>
        </span>
        <div class="status">{{item.status}}</div>
        <div class="seeOrderListright">
          <span class="see-details">
            <span class="xq" style="margin-right:0;">{{item.price}} 元</span>
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
      // headerName: '充值扣费',
      rechargeList: {},
      currChild: {}
    }
  },
  components: {
    // vHeader
  },
  mounted () {
    this.getRechargeList()
  },
  methods: {
    getRechargeList () {
      this.currChild = JSON.parse(sessionStorage.getItem('currChild'))
      this.$axios({
        method: 'POST',
        url: 'wechat/v1.0/users/payrecords',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          cardNo: this.$route.query.cardNo,
          date: this.currChild.date,
          page: 0,
          pageSize: 0
        })
      }).then(res => {
        if (res.data.resultCode === 0) {
          this.rechargeList = res.data.data.reverse()
          // console.log(this.rechargeList)
        } else {
          this.$toast('加载失败')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../../common/css/seeorder);
</style>
