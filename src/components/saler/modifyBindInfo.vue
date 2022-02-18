<template>
  <!-- 绑定学霸卡 -->
  <div class="activate_content">
    <div class="info-input">
        <van-field label="合伙人手机号" placeholder="请输入合伙人手机号" />
        <van-field label="联系地址" placeholder="请输入联系地址" />
        <div class="send-code">
            <van-field class="send-code-item" placeholder="请输入图形验证码" />
            <van-field class="send-code-item" placeholder="图形验证码" />
        </div>
        <div class="send-code">
            <van-field class="send-code-item" label="短信验证码" placeholder="请输入短信验证码"/>
            <button class="send-code-btn">发送短信验证码</button>
        </div>
    </div>
    <div class="activate_con">
      <van-button type="info" round size="large" color="#FFBA27" style="height:42px;" >确认修改</van-button>
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
.info-input{
    margin-left: 1%;
    margin-top:15%;
}
.send-code{
    display: flex;
}
.send-code-item{
    flex: 1;
}
.send-code-btn{
    flex: 1;
    font-size: 10px;
    background: #FFBA27;
    color: white;
    border: 0;
    margin-left: 6%;
    margin-right: 6%;

}
</style>
