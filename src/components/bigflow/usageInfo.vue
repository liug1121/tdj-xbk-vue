<template>
  <div class="page">
    <div v-if="cardInfos.length > 0">
      <div class="useage" v-for="(record, index) in cardInfos" :key="index">
        <table>
          <tr>
            <td>设备名称：</td>
            <td class="order-info">{{ record.phoneNumber }}</td>
          </tr>
          <tr>
            <td>MSISDN：</td>
            <td class="order-info">{{ record.phoneNumber }}</td>
          </tr>
          <tr>
            <td>ICCID：</td>
            <td class="order-info">{{ record.iccid }}</td>
          </tr>
          <tr>
            <td>当前套餐：</td>
            <td class="order-info">{{ record.currentMeal }}</td>
          </tr>
          <tr>
            <td>当月剩余：</td>
            <td class="order-info">{{ record.flowSurplusUsed }}</td>
          </tr>
          <tr>
            <td>未生效套餐：</td>
            <td class="order-info">{{ record.nextMeal}}</td>
          </tr>
        </table>

        <div class="buttons">
          <div class="button-unbind" @click="unbind(record.iccid)">
            解绑
          </div>
          <div class="button-detail" @click="toDetail(record.iccid)">
            详情
          </div>
        </div>
      </div>
      <div class="addcard" @click="toBind">+</div>
    </div>
    <div class="addcardpage" v-else>
      <div class="note">当前没有绑定任何卡，点击绑卡</div>
      <div class="addcard" @click="toBind">+</div>
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
      bindStatus: 1,
      cardInfos: []
    }
  },
  created() {
    this.getCards()
  },
  methods: {
    unbind: function(iccid) {
        this.$dialog.confirm({
            title: '提醒',
            message: '确认进行该操作吗？'
        }).then(() => {
            var params = {}
            params.iccid = iccid
            this.loadingShow = true
            API.apiUnBindCard(params).then(res => {
                if (res.resultCode === 0) {
                    this.$toast('解绑成功')
                    this.loadingShow = false
                    this.getCards()
                } else {
                    this.loadingShow = false
                    this.$toast('解绑失败')
                }
            })
        }).catch(() => {
        })
    },
    toBind: function() {
      this.$router.push({
            path: '/bigflowBind'
          })
    },
    toDetail (iccid) {
        this.$router.push({
            path: '/usageDetails',
            query: { iccid: iccid }
          })
    },
    getCards: function() {
        var params = {}
        this.loadingShow = true
        API.apiGetCards(params).then(res => {
            if (res.resultCode === 0) {
                this.cardInfos = res.data
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
    height:100%;
    width:100%;
}
.useage{
    height:30%;
    border-radius:15px;
    background:white;
    margin:20px;
    font-size: 15px;
}
table{
    margin:30px;
    width:90%;
}
tr{
    height:50px
}
.order-info{
    text-align:right;
}
.buttons{
    display:flex;
    text-align:center;
    color:white;
}
.button-unbind{
    flex:1;
    background: #e9975a;
    height: 60px;
    margin: 20px;
    line-height: 60px;
}
.button-detail{
    flex: 1;
    background: #5388df;
    height: 60px;
    margin: 20px;
    line-height: 60px;
}
.note{
    text-align: center;
    font-size: 25px;
    color: gray;
}
.addcard{
    text-align: center;
    font-size: 80px;
    color: gray;
}
.addcardpage{
    padding-top: 20%;
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
