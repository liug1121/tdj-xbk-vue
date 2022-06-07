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
            <td>卡状态：</td>
            <td v-if="record.auth_status === 0" class="order-info">未实名 不可用</td>
            <td v-else class="order-info">正常</td>
          </tr>
        </table>
        <div v-if="record.auth_status === 0" class="buttons">
          <!-- <div class="button-detail" @click="toReal">
            去实名
          </div> -->
          <div class="button-detail" @click="toDetail(record.iccid)">
            详情
          </div>
          <div class="button-detail" @click="toUnbind(record.iccid)">
            解绑
          </div>
        </div>
        <div v-else class="buttons">
          <div class="button-detail" @click="toDetail(record.iccid)">
            详情
          </div>
          <div class="button-detail" @click="toUnbind(record.iccid)">
            解绑
          </div>
        </div>
      </div>
      <div class="addcard" @click="toBind">+</div>
    </div>
    <div class="addcardpage" v-else>
      <div class="note">当前没有绑定任何卡，点击绑定</div>
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
                // this.$toast(res.resultInfo)
                this.loadingShow = false
                this.bindStatus = 0
            }
        })
      },
    toBind () {
      this.$router.push({
            path: '/ZxBind'
          })
    },
    toUnbind (iccid) {
      this.$dialog.confirm({
            title: '提醒',
            message: '确认解绑吗'
        }).then(() => {
            var params = {}
            params.iccid = iccid
            console.log('sdsd')
            this.loadingShow = true
            API.apiZxCardUnBind(params).then(res => {
            if (res.resultCode === 0) {
                this.getCardInfos()
                this.$toast('解绑成功')
                this.loadingShow = false
            } else {
                this.$toast(res.resultInfo)
                this.loadingShow = false
            }
        })
        }).catch(() => {
        })
    },
    toDetail (iccid) {
        this.$router.push({
            path: '/ZxCardInfoDetail',
            query: { iccid: iccid }
          })
    },
    toReal () {
        this.$router.push({
            path: '/activateCard'
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
.button{
    background: #FFBA27;
    width: 90%;
    height:45px;
    border-radius: 15px;
    margin-left :5%;
    color: white;
    font-size: 15px;
    align-items: center;
    display:  -webkit-flex;
    justify-content: center;
    display: -webkit-flex;
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
.to-real-note {
    color: #FFBA27;
}
</style>
