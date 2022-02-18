<template>
  <!-- 绑定学霸卡 -->
  <div class="activate_content">
    <div class="notice">支付失败</div>
    <div class="activate_con">
      <van-button class="activate_con_item" type="info" round size="large" color="#FFBA27" style="height:42px;" >重新支付</van-button>
      <van-button class="activate_con_item" type="info" round size="large" color="#FFBA27" style="height:42px;" >查看订单</van-button>
    </div>
  </div>
</template>

<script>
import imageUrls from 'common/images/person.png'
// import FileSelect from './selectFileBtn.vue'
import wx from 'weixin-jsapi'
// import { Toast } from 'vant'
import API from 'api/activation'
export default {
  data () {
    return {
      ruleForm: {
        studentName: '',
        orderPhone: '',
        iccid: '',
        iconUrl: imageUrls,
        iconUrlNew: ''
      },
      oldIconUrl: true,
      newIconUrl: false,
      isShowUpload: true,
      childrenImage: '',
      loadingShow: false
    }
  },
  components: {
    // FileSelect
  },
  created () {
    API.apiSigin({ url: window.location.href.split('#')[0] }).then(res => {
      wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx92971625eac3ce35', // 必填，公众号的唯一标识
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
        signature: res.data.signature, // 必填，签名
        jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表
      })
      wx.ready(function () {
        wx.checkJsApi({
          jsApiList: ['scanQRCode'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
          success: function (res) {
            // 以键值对的形式返回，可用的api值true，不可用为false
            // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
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
  }
}
</script>

<style lang="less" scoped>
@import url(../../common/css/activation.less);
.notice{
    font-size: 20px;
    margin-left: 40%;
    margin-top:30%;
    margin-bottom: 10%;
    color: #ed7020;
}
.activate_con{
    display: flex;
}
.activate_con_item{
    flex: 1;
    margin: 10px;
}
</style>
