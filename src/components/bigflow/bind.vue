<template>
  <div class="page">
    <div class="head">
      <img class="head-img" src="../../common/images/bigflow-head.png" />
    </div>
    <div class="iccid">
      <table class="table">
        <tr>
          <td class="col-iccid-input">
            <input class="iccid-input" v-model="iccid19" type="tel"/>
          </td>
          <td class="col-iccid-scan" @click="scan">
            <img class="scan" src="../../common/images/scan.jpeg"/>
          </td>
        </tr>
      </table>
    </div>
    <div class="button" @click="bind">确 定</div>
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
import API from 'api/bigflow'
import wx from 'weixin-jsapi'
export default {
  data () {
    return {
      iccid19: '',
      loadingShow: false
    }
  },
  created() {
  },
  methods: {
    bind: function() {
        if (this.iccid19 === null || this.iccid19 === '' || this.iccid19.length !== 19) {
            this.$toast('请输入19位iccid')
            return
        }
        this.$dialog.confirm({
            title: '提醒',
            message: '确认进行该操作吗？'
        }).then(() => {
            var params = {}
            params.iccid = this.iccid19
            this.loadingShow = true
            API.apiBind(params).then(res => {
                if (res.resultCode === 0) {
                    this.$toast('绑定成功')
                    this.loadingShow = false
                    if (res.data.authStatus === 'uncertified') {
                        this.toCert()
                    } else {
                        this.toUsgeInfo()
                    }
                    // this.getCards()
                } else {
                    this.loadingShow = false
                    this.$toast('绑定失败：' + res.resultInfo)
                }
            })
        }).catch(() => {
        })
    },
    toCert: function(iccid) {
        this.$router.push({
            path: '/toCert'
        })
    },
    toUsgeInfo: function(iccid) {
        this.$router.push({
            path: '/usageInfo'
        })
    },
    scan: function() {
      var params = {}
      var url = window.location.href.split('#')[0]
      params.url = url
      API.apiWxSign(params).then(
        res => {
          console.log(JSON.stringify(res))
          if (res.resultCode === 0) {
            var wxSign = res.data
            console.log(JSON.stringify(wxSign))
            var that = this
            console.log('1')
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: wxSign.appId, // 必填，公众号的唯一标识
              timestamp: wxSign.timestamp, // 必填，生成签名的时间戳
              nonceStr: wxSign.nonceStr, // 必填，生成签名的随机串
              signature: wxSign.signature, // 必填，签名
              jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
            })
            console.log('2')
            wx.ready(function() {
              wx.checkJsApi({
                jsApiList: ['scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                success: function(res) {
                  // 以键值对的形式返回，可用的api值true，不可用为false
                  // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
                  console.log(JSON.stringify(res))
                  wx.scanQRCode({
                    needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                    scanType: ['barCode'], // 可以指定扫二维码还是一维码，默认二者都有
                    success: function(res) {
                      // alert(JSON.stringify(res))
                      var iccid = res.resultStr.split('CODE_128,')[1]
                      if (!iccid) {
                        iccid = res.resultStr
                      }
                      if (!iccid && iccid.length !== 19) {
                        return
                      }
                      // alert(iccid)
                      that.iccid19 = iccid
                    }
                  })
                }
              })
              wx.hideAllNonBaseMenuItem()
            })
          }
        }
      )
    }
  }
}
</script>
<style lang="less" scoped>
.page{
    height:100%
}
.head{
    background:gray;
    height:30%
}
.head-img{
    height:100%;
    width:100%
}
.iccid{
    background:white;
    height:10%;
    width:90%;
    margin-left:5%;
    margin-top:10%;
    margin-bottom:10%;
    border-radius:15px;;
    box-shadow :#666 0px 0px 10px;
}
.table{
    width:100%
}
.col-iccid-input{
    width:70%;
    text-align:left;
}
.col-iccid-scan{
    width:20%;
    text-align:center;
    font-size: 20px;
    color: gray;
}
.iccid-input{
    width:99%;
    height:50px;
    margin-top:1px;
    margin-left:5px;
    border:0px solid #dadada;
    font-size: 22px;
    color: gray;
}
.scan{
    width:40px;
    height:40px;
    margin-top:5px;

}
.button{
    background:#4388de;
    width:90%;
    height:6%;
    border-radius:15px;
    margin-left:5%;
    color:white;
    font-size:20px;
    align-items:center;
    display:-webkit-flex;
    justify-content:center;
    display:-webkit-flex;
}
.note{
    margin:35px;
    background: white;
    height:10px;
    font-size:20px;
}
.card{
    margin:60px;
    width: 5.8rem;
    height: 4.3rem;
    display:block;
    background:url(../../common/images/card-demo.png) no-repeat 100% 100%;
    background-size:contain;
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
