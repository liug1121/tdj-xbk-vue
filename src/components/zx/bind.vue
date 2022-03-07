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
          <td class="col-iccid-scan" @click="startRecognize">
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
import wx from 'weixin-jsapi'
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
      API.apiSigin({ url: window.location.href.split('#')[0] }).then(res => {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wxd28b159bd97976d0', // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature, // 必填，签名
        jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
      })
      wx.ready(function () {
        wx.checkJsApi({
          jsApiList: ['scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
          success: function (res) {
          }
        })
        wx.hideAllNonBaseMenuItem()
      })
    }, $error => {
      // Toast({message: $error.resultView});
    })
  },
  mounted() {
    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL)
    })
  },
  methods: {
    toCardInfo () {
        this.$router.push({
            path: '/ZxCardInfo'
          })
    },
      startRecognize () {
      console.log('startRecognize')
      var _self = this
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        scanType: ['barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        success: function (res) {
          var iccid = res.resultStr.split('CODE_128,')[1]
          if (!iccid) {
            iccid = res.resultStr
          }
          if (!iccid && iccid.length !== 19) {
            return this.$toast('获取数据错误，请重新扫描')
          }
          _self.iccid2Bind = iccid
        }
      })
    },
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
                this.toCardInfo()
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
