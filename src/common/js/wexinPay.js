// import wx from 'weixin-js-sdk'
export default {
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
  weixinTradePay (obj, $func) {
    this.weixinJSBridgeReady(function () {
      window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest',
        {
          appId: obj.appId, // 公众号名称，由商户传入
          timeStamp: obj.timeStamp, // 时间戳，自1970年以来的秒数
          nonceStr: obj.nonceStr, // 随机串
          package: obj.package,
          signType: obj.signType, // 微信签名方式:
          paySign: obj.paySign // 微信签名
        },
        function (result) {
          if (result.err_msg === 'get_brand_wcpay_request:ok') {
            $func()
          } else {
            this.$toast('支付失败')
          }
        }
      )
    })
  }
}
// export function wexinPay (data) {
//   return new Promise((resolve, reject) => {
//     // 后台传入数据
//     const {
//       appId,
//       timestamp,
//       nonceStr,
//       signature,
//       packages,
//       paySign,
//       signType
//     } = data
//     // 验证微信环境
//     wx.config({
//       debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
//       appId: appId, // 必填，公众号的唯一标识
//       timestamp: timestamp, // 必填，生成签名的时间戳
//       nonceStr: nonceStr, // 必填，生成签名的随机串
//       signature: signature, // 必填，签名，见附录1
//       jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
//     })
//     wx.ready(function () {
//       wx.chooseWXPay({
//         timestamp: timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
//         nonceStr: nonceStr, // 支付签名随机串，不长于 32 位
//         package: packages, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
//         signType: signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
//         paySign: paySign, // 支付签名
//         success: function (res) {
//           // 支付成功后的回调函数
//           resolve(res)
//         },
//         fail: function (res) {
//           // 失败回调函数
//           // reject({
//           //   payFail: res
//           // })
//         }
//       })
//     })
//     wx.error(function (res) {
//       // reject({
//       //   configFail: res
//       // })
//       // config信息验证失败会执行error函数
//     })
//   })
// }
