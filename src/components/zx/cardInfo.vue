<template>
  <div class="page">
    <div v-if="bindStatus == 1">
      <div class="useage" v-for="(record, index) in cardInfos" :key="index">
        <table>
          <tr>
            <td>设备名称：</td>
            <td class="order-info">{{ record.phone_number }}</td>
          </tr>
          <tr>
            <td>MSISDN：</td>
            <td class="order-info">{{ record.phone_number }}</td>
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
            <td>当月用量：</td>
            <td class="order-info">{{ record.flowSurplusUsed }}</td>
          </tr>
        </table>

        <div class="buttons">
          <!-- <div class="button-unbind" @click="shwoMsgDlg(record.iccid20)">
            解绑
          </div> -->
          <div class="button-detail" @click="toDetail(record.iccid)">
            详情
          </div>
        </div>
      </div>
      <div class="addcard" @click="toBind">+</div>
    </div>
    <div class="addcardpage" v-else>
      <div class="note">当前没有绑定任何卡</div>
      <div class="addcard" @click="toBind">+</div>
    </div>
    <div v-show="loadingShow" class="loading">
      <van-loading type="spinner" color="#FDAB16" />
    </div>
  </div>
</template>
<script>
import API from 'api/zx'
export default {
  components: {
    // MsgDlg
  },
  data() {
    return {
      cardInfos: [],
      bindStatus: 0,
      showComfirmDlg: 0,
      iccidForUnbind: '',
      loadingShow: false
    }
  },
  created() {
    this.getCardInfos()
  },
  methods: {
      getCardInfos () {
          var params = {}
          API.apiGetCardsInfo(params).then(res => {
            if (res.resultCode === 0) {
                this.cardInfos = res.data
                if (this.cardInfos.length > 0) {
                    this.bindStatus = 1
                }
                this.loadingShow = false
            } else {
                this.$toast(res.resultInfo)
                this.loadingShow = false
            }
        })
      },
    toBind () {
      this.$router.push({
            path: '/ZxBind'
          })
    },
    toDetail (iccid) {
        this.$router.push({
            path: '/ZxCardInfoDetail',
            query: { iccid: iccid }
          })
    }
  }
}
</script>
<style lang="less" scoped>
.page{
    background: #f6f6f6;
    height: 100%;
    width: 100%;
    padding-top: 10px;
}
.useage{
    height: 33%;
    border-radius: 15px;
    background: white;
    margin: 15px;
}
table{
    margin: 30px;
    width: 90%;
    font-size: 15px;
}
tr{
    height: 50px;
}
.order-info{
    text-align: right;
}
.buttons{
    display: flex;
    text-align: center;
    color: white;
}
.button-unbind{
    flex: 1;
    background: #e9975a;
    height: 60px;
    margin: 20px;
    line-height: 60px;
}
.button-detail{
    flex: 1;
    background: #FFBA27;
    border-radius: 15px;
    height: 60px;
    margin: 20px;
    line-height: 60px;
    font-size: 20px;
}
.note{
    text-align: center;
    font-size: 20px;
    color: gray;
}
.addcard{
    text-align: center;
    font-size: 80px;
    color: #FFBA27;
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
