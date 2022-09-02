<template>
  <div class="page">
    <div class="orderinfo" v-for="(record, index) in buyRecords" :key="index">
      <table>
        <tr>
          <td>时间：</td>
          <td class="order-info">{{ record.gmtCreate }}</td>
        </tr>
        <tr>
          <td>套餐订购：</td>
          <td class="order-info">{{ record.viewName }}</td>
        </tr>
        <tr>
          <td>金额：</td>
          <td class="order-info">¥{{ record.price }}</td>
        </tr>
      </table>
    </div>
    <div v-show="loadingShow" class="loading">
      <van-loading type="spinner" color="#FDAB16" />
    </div>
  </div>
</template>
<script>
import API from 'api/bigflow'
export default {
  data () {
    return {
      loadingShow: false,
      buyRecords: [
        {
            gmtCreate: '',
            viewName: '',
            price: ''
        }
      ]
    }
  },
  created() {
    this.getBuyRecords()
  },
  methods: {
    getBuyRecords: function() {
        var params = {}
        this.loadingShow = true
        API.apiGetBuyRecords(params).then(res => {
            if (res.resultCode === 0) {
                this.buyRecords = res.data
                this.loadingShow = false
            } else {
                this.loadingShow = false
            }
        })
    }
  }
}
</script>
<style lang="less" scoped>
.page{
    background:#f6f6f6;
    height: 100%;
    width: 100%;
    font-size: 18px;
}

.orderinfo{
    height: 23%;
    background: white;
    margin: 5px;
    border-radius: 15px;
}
table{
    margin: 30px;
    width: 90%;
}
tr{
    height: 50px;
}
.order-info{
    text-align: right;
}
.loading {
  position: fixed;
  padding-top: 75%;
  padding-left: 48%;
  z-index: 999;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
