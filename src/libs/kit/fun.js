/**
 * 公用方法(只适用当前项目).
 */

export default {
  getMetaTypeDesc: $id => {
    const metaType = {
      1: 'totalswitch',
      2: 'callservice',
      3: 'smsservice',
      4: 'netservice'
    }
    return metaType[parseInt($id)] || ''
  },
  jsonToFormData: $json => {
    if ($json instanceof FormData) {
      return $json
    }
    try {
      const fd = new FormData()
      if (typeof $json === 'string') {
        $json = JSON.parse($json)
      }
      Object.keys($json).forEach($k => {
        fd.append($k, $json[$k])
      })
      return fd
    } catch (e) {
      throw e
    }
  },
  getLocalData: (k) => {
    let v = localStorage.getItem(k)
    if (v === null || v === undefined || v === 'null' || v === 'undefined') {
      v = ''
      return v
    }
    return v
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
  weixinTradePay (obj, $func) {
    this.weixinJSBridgeReady(function () {
      window.WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
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
          }
          // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
          else {
            Toast('支付失败')
          }
        }
      )
    })
  },
  goTo (target) {
    var scrollT = document.body.scrollTop || document.documentElement.scrollTop
    if (scrollT > target) {
      var timer = setInterval(function () {
        var scrollT = document.body.scrollTop || document.documentElement.scrollTop
        var step = Math.floor(-scrollT / 6)
        document.documentElement.scrollTop = document.body.scrollTop = step + scrollT
        if (scrollT <= target) {
          document.body.scrollTop = document.documentElement.scrollTop = target
          clearTimeout(timer)
        }
      }, 20)
    } else if (scrollT === 0) {
      var timer = setInterval(function () {
        var scrollT = document.body.scrollTop || document.documentElement.scrollTop
        var step = Math.floor(300 / 3 * 0.7)
        document.documentElement.scrollTop = document.body.scrollTop = step + scrollT
        console.log(scrollT)
        if (scrollT >= target) {
          document.body.scrollTop = document.documentElement.scrollTop = target
          clearTimeout(timer)
        }
      }, 20)
    } else if (scrollT < target) {
      var timer = setInterval(function () {
        var scrollT = document.body.scrollTop || document.documentElement.scrollTop
        var step = Math.floor(scrollT / 6)
        document.documentElement.scrollTop = document.body.scrollTop = step + scrollT
        if (scrollT >= target) {
          document.body.scrollTop = document.documentElement.scrollTop = target
          clearTimeout(timer)
        }
      }, 20)
    } else if (target == scrollT) {
      return false
    }
  }
}
