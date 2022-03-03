<template>
  <div class="page">
    <div class="head">
      <!-- <img class="head-img" src="../../common/images/bigflow-head.png" /> -->
    </div>
    <div class="iccid">
      <table class="table">
        <tr>
          <td class="col-iccid-input">
            <input class="iccid-input" v-model="iccid2Bind" />
          </td>
          <td class="col-iccid-scan">
            <img class="scan" src="../../common/images/scan.jpeg" />
          </td>
        </tr>
      </table>
    </div>
    <div class="button" @click="bind">确定</div>
    <div class="note">
      温馨提示：请根据下图提示完成开卡激活流程
    </div>
    <div class="card"></div>
    <div v-show="loadingShow" class="loading">
      <van-loading type="spinner" color="#FDAB16" />
    </div>
  </div>
</template>
<script>
import API from 'api/zx'
export default {
  data () {
    return {
        iccid2Bind: '',
        loadingShow: false
    }
  },
  components: {
    // FileSelect
  },
  created () {
    console.log('creted')
  },
  mounted() {
    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL)
    })
  },
  methods: {
      sendSms () {
        console.log('sendSms')
      },
      bind () {
          console.log('bind')
          if (this.iccid2Bind === null || this.iccid2Bind === '') {
              this.$toast('请先输入要绑定的19位卡号')
              return
          }
          this.$dialog.confirm({
            title: '提醒',
            message: '确认绑定信息吗'
        }).then(() => {
            var params = {}
            params.iccid = this.iccid2Bind
            console.log('sdsd')
            this.loadingShow = true
            API.apiZxCardBind(params).then(res => {
            if (res.resultCode === 0) {
                this.$toast('绑定成功')
                this.loadingShow = false
            } else {
                this.$toast(res.resultInfo)
                this.loadingShow = false
            }
        })
        }).catch(() => {
        })
      }
  }
}
</script>
<style lang="less" scoped>
.page{
    height:100%;
}
.head{
    background:white;
    height:100px;
}
.head-img{
    height:100%;
    width:100%;
}
.iccid{
    background:white;
    height :80px;
    width :90%;
    margin-left: 5%;
    margin-top :10%;
    margin-bottom :10%;
    border-radius: 15px;
    box-shadow : #666 0px 0px 10px;
}
.table{
    width :100%;
}
.col-iccid-input{
    width:70%;
    text-align: center;
}
.col-iccid-scan{
    width:20%;
    text-align: center;
}
.iccid-input{
    width: 90%;
    height: 60px;
    // margin-top: 10px;
    display: inline-block;
    border-radius: 15px;
    background: white;
    border :1px solid white;
    font-size: 20px;
}
.scan{
    width: 30px;
    height: 30px;
    // margin-top: 5px;

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
    margin-left: 10%;
    margin: 20px;
    background: white;
    height:5px;
    font-size: 13px;
    color: gray;
}
.card{
    margin-left: 20%;
    width: 250px;
    height: 200px;
    display: block;
    background:  url(../../common/images/card-demo.png) no-repeat 100% 100%;
    background-size: contain;
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
