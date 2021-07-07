<template>
  <div>
    <!-- <v-header :headerName="headerName"></v-header> -->
    <!-- logo 区域 -->
    <div class="logo">
      <img class="img-logo" :src="liantongLogo" alt="">
      <img class="img-logo" :src="suningLogo" alt="">
      <img class="img-logo" :src="xuebakaLogo" alt="">
      <!-- <img :src="logos"> -->
    </div>
    <!-- form 表单区域 -->
    <div class="box-card">
      <van-form :model="openingCardForm" ref="openingCardForm" label-width="100px" class="demo-ruleForm" label-position="left">
        <van-field v-model="openingCardForm.studentName" label="孩子姓名" required placeholder="请输入孩子姓名" />
        <van-field v-model="openingCardForm.contact" label="家长手机号" required placeholder="请输入家长手机号" />
        <van-field v-model="openingCardForm.iccid" label="ICCID" required placeholder="请输入19位ICCID号，或者点击扫描" @change="iccidChange">
          <template #button>
            <van-button icon="scan" type="primary" color="#FFBA27" style="width:20px;height:30px; positon:absolute;right:0;" @click="startRecognize" />
          </template>
        </van-field>
      </van-form>
    </div>
    <!-- 示意图 区域 -->
    <div class="wrap-card-demo">
      <div class="tit"><span class="borders"></span>苏宁99学霸卡示意图</div>
      <div class="card-demo"></div>
    </div>
    <!-- 套餐 区域 -->
    <div class="wrap-card-demo">
      <div class="tit"><span class="borders"></span>套餐</div>
      <div class="list" v-for="(item,key) in packageList" :key="key">
        <div class="text">
          <div>{{item.name}}</div>
          <div>共12个月</div>
        </div>
        <div class="price">
          <div class="newP">￥{{item.price}}</div>
          <div class="oldP">￥{{item.origPrice}}</div>
        </div>
      </div>
    </div>
    <!-- 同意协议 区域 -->
    <div class="import_info">
      <van-checkbox v-model="ischecked" checked-color="#FFB525" icon-size="14px"></van-checkbox>
      我已同意并阅读<span style="color: #ffba26" @click="onClick_openAgreeBox">《学霸卡入网服务协议》</span>
    </div>
    <!-- 按钮 区域 -->
    <div class="activate_con">
      <van-button type="info" size="large" color="#FFBA27" style="height:42px;" @click="useButton" :disabled="isDisable">立即使用</van-button>
    </div>
    <!-- 入网协议组件 -->
    <card-agreement ref="agreementRef"></card-agreement>
    <div v-show="loadingShow" class="loading">
      <van-loading type="spinner" color="#FDAB16" />
    </div>
  </div>
</template>

<script>
// import VHeader from './../header'
import cardAgreement from '../applyCard/cardAgreement'
import liantongLogo from 'common/images/liantong_logo.png'
import suningLogo from 'common/images/suning_logo.png'
import xuebakaLogo from 'common/images/xuebaka_logo.png'
import logos from 'common/images/logos.png'
import API from './../../api/applyCard'
import wx from 'weixin-jsapi'
import Vue from 'vue'
import {
  Toast
} from 'vant'
Vue.use(Toast)
export default {
  data () {
    return {
      // headerName: '苏宁99学霸卡',
      liantongLogo: liantongLogo,
      suningLogo: suningLogo,
      xuebakaLogo: xuebakaLogo,
      logos: logos,
      openingCardForm: {
        studentName: null,
        contact: null,
        goodId: null,
        iccid: null,
        price: null,
        Province: null
      },
      // 协议选择
      ischecked: true,
      packageList: [],
      loadingShow: false,
      isDisable: false,
      channelIdNew: sessionStorage.getItem('channelIdNew')
    }
  },
  components: {
    // VHeader,
    cardAgreement
  },
  created () {
    // this.getPackageList()
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
            // console.log(res)
          }
        })
        wx.hideAllNonBaseMenuItem()
      })
    }, $error => {
      // Toast({message: $error.resultView});
    })
    this.channelIdNew = sessionStorage.getItem('channelIdNew')
    if (this.channelIdNew === null || this.channelIdNew === '' || this.channelIdNew === undefined) {
      this.channelIdNew = 124
      sessionStorage.setItem('channelIdNew', this.channelIdNew)
    } else {
      this.channelIdNew = sessionStorage.getItem('channelIdNew')
    }
  },
  watch: {
    'openingCardForm.iccid': function ($value, $oldValue) {
      if ($value.length === 19) {
        this.isDisable = true
        const data = {
          iccid: this.openingCardForm.iccid
        }
        API.apiCardsProvince(data).then(res => {
          if (res.resultCode === 0) {
            this.Province = res.data.provinceId
            this.getPackageList(this.Province)
          } else {
            this.$toast(res.resultInfo)
          }
        })
      }
    }
  },
  methods: {
    // 点击入网协议
    onClick_openAgreeBox () {
      this.$refs.agreementRef.showAgreement = true
    },
    startRecognize () {
      var _self = this
      wx.scanQRCode({
        needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
        // scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是一维码，默认二者都有
        scanType: ['barCode'],
        success: function (res) {
          // alert(JSON.stringify(res))
          var iccid = res.resultStr.split('CODE_128,')[1]
          if (!iccid) {
            iccid = res.resultStr
          }
          if (!iccid && iccid.length !== 19) {
            return Toast('获取数据错误，请重新扫描')
          }
          // alert(iccid)
          _self.openingCardForm.iccid = iccid
        }
      })
    },
    iccidChange () {
      var stuCardReg = /^[0-9]{19}/
      if (!stuCardReg.test(this.openingCardForm.iccid)) {
        this.$toast('您输入的ICCID号不足19位，请重新输入')
        return false
      } else {
        this.isDisable = true
        const data = {
          iccid: this.openingCardForm.iccid
        }
        API.apiCardsProvince(data).then(res => {
          if (res.resultCode === 0) {
            this.Province = res.data.provinceId
            this.getPackageList(this.Province)
          } else {
            this.$toast(res.resultInfo)
          }
        })
      }
    },
    // 获取套餐
    getPackageList ($Province) {
      const params = {
        provinceId: $Province,
        channelId: Number(this.channelIdNew)
      }
      API.apiChannelPackageList(params).then(res => {
        if (res.resultCode === 0) {
          this.packageList = res.data
          if (this.packageList.length !== 0) {
            this.openingCardForm.goodId = this.packageList[0].goodId
            this.openingCardForm.price = this.packageList[0].price
          }
          this.isDisable = false
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // 立即使用
    useButton () {
      var reg = 11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/
      var stuCardReg = /^[0-9]{19}/
      if (!this.openingCardForm.studentName) {
        this.$toast('学生姓名不能为空，请输入学生姓名!')
        return false
      } else if (!this.openingCardForm.contact) {
        this.$toast('家长手机不能为空，请输入您的手机号!')
        return false
      } else if (!reg.test(this.openingCardForm.contact)) {
        this.$toast('手机号格式不正确')
        return false
      } else if (!this.openingCardForm.iccid) {
        this.$toast('ICCID不能为空，请输入或扫描您的ICCID号')
      } else if (!stuCardReg.test(this.openingCardForm.iccid)) {
        this.$toast('您输入的ICCID号不足19位，请重新输入')
        return false
      } else {
        const OrderForm = {
          contact: this.openingCardForm.contact,
          goodId: this.openingCardForm.goodId,
          iccid: this.openingCardForm.iccid,
          price: Number(this.openingCardForm.price),
          provinceId: this.Province,
          channelId: Number(this.channelIdNew)
        }
        this.isDisable = true
        // 生成预订单
        API.apiOrderPreorderCreate(OrderForm).then(res => {
          if (res.resultCode === 0) {
            const uuid = res.data
            API.apiOrderOrderId().then(res => {
              const orderId = res.data
              this.loadingShow = true
              const data = {
                body: '购买苏宁99学霸卡',
                out_trade_no: res.data,
                total_fee: Number(this.openingCardForm.price) * 100
              }
              API.apiWXprepay(data).then(res => {
                if (res.resultCode === 0) {
                  this.loadingShow = false
                  this.weixinTradePay(res.data, orderId, uuid, this.openingCardForm)
                } else {
                  this.$toast(res.resultInfo)
                }
              })
            })
          } else {
            this.$toast(res.resultInfo)
          }
        })
      }
    },
    weixinJSBridgeReady (callback) {
      // 如果jsbridge已经注入则直接调用
      if (typeof WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', callback, false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', callback)
          document.attachEvent('onWeixinJSBridgeReady', callback)
        }
      } else {
        callback && callback()
      }
    },
    // 发起支付
    weixinTradePay (obj, orderId, uuid, openingCardForm) {
      const self = this
      this.weixinJSBridgeReady(function () {
        window.WeixinJSBridge.invoke(
          'getBrandWCPayRequest',
          {
            appId: obj.appId, // 公众号名称，由商户传入
            timeStamp: obj.timeStamp, // 时间戳，自1970年以来的秒数
            nonceStr: obj.nonceStr, // 随机串
            package: obj.pkg,
            signType: obj.signType, // 微信签名方式:
            paySign: obj.paySign // 微信签名
          },
          function (result) {
            if (result.err_msg === 'get_brand_wcpay_request:ok') {
              const data = {
                uuid: uuid,
                orderId: orderId
              }
              API.apiOrdersPayedStatus(data).then(res => {
                if (res.resultCode === 0) {
                  Toast('支付成功！')
                  const activation = {
                    studentName: openingCardForm.studentName,
                    orderPhone: openingCardForm.contact,
                    iccid: openingCardForm.iccid,
                    iconUrl: ''
                  }
                  API.apiAddaActivation(activation).then(res => {
                    if (res.resultCode === 0) {
                      self.$router.replace({ path: '/useCard' })
                    } else {
                      Toast(res.resultInfo)
                      self.$router.replace({ path: '/useCard' })
                    }
                  })
                } else {
                  Toast(res.resultInfo)
                }
              })
            } else {
              self.$toast('支付失败')
              self.isDisable = false
            }
          }
        )
      })
    }
  }
}
</script>

<style lang="less" scoped>
.logo {
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  background: #eee;
  .img-logo {
    height: 60px;
  }
}
.box-card {
  width: 100%;
  border-top: 1px solid #ebedf0;
}
.van-cell {
  font-size: 14px;
  line-height: 30px;
  padding: 10px 10px 10px 20px;
}
.van-cell::after {
  border-bottom: 1px solid #ebedf0;
}

.wrap-card-demo {
  margin-bottom: 10px;
  padding: 10px 0;
  border-top: 1px solid #ebedf0;
  .tit {
    height: 30px;
    font-size: 14px;
    line-height: 20px;
    text-align: left;
    padding-left: 10px;
    .borders {
      display: inline-block;
      width: 3px;
      height: 15px;
      background: #ffb525;
      margin-right: 10px;
      position: relative;
      top: 3px;
    }
  }
  .card-demo {
    width: 4.64rem;
    height: 3.44rem;
    margin: 0 auto;
    display: block;
    background: url(../../common/images/card-demo.png) no-repeat 100% 100%;
    background-size: contain;
  }
  .list {
    display: flex;
    font-size: 14px;
    padding: 0 10px 10px 10px;
    border-bottom: 1px solid #ebedf0;
    align-items: center;
    .text {
      flex: 1;
    }
    .price {
      width: 80px;
      .newP {
        color: #d50b25;
        font-size: 18px;
        text-align: right;
      }
      .oldP {
        font-size: 12px;
        text-align: right;
        text-decoration: line-through;
      }
    }
  }
}
.import_info {
  height: 25px;
  line-height: 25px;
  font-size: 10px;
  text-align: center;
  .van-checkbox {
    display: inline-block;
    font-size: 10px;
    vertical-align: middle;
  }
  a {
    color: #ffb525;
  }
}
.activate_con {
  padding: 0 10px 20px 10px;
}
</style>
