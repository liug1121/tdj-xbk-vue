<template>
  <div class="page">
    <div class="head">
      <div class="head-img">
        <img class="head-img-image" src="../../common/images/bigflow-person.jpeg" />
      </div>
      <div class="head-card">
        <div>{{ cardDetails.phone_number }}</div>
        <div>{{ cardDetails.iccid }}</div>
      </div>
    </div>
    <div class="detail">
      <div class="detail-title">套餐详情</div>
      <div class="detail-button">剩余{{ cardDetails.flowSurplusUsed }}</div>
      <div class="detail-note">
        <div>您的套餐：{{ cardDetails.currentMeal }}</div>
        <div>
          有效期：{{ cardDetails.mealStartDate }}-{{ cardDetails.mealEndDate }}
        </div>
      </div>
      <div class="detail-note">
        <div>未使用套餐：{{ cardDetails.nextMeal }}</div>
        <div>
          开始生效时间：{{ cardDetails.nextMealStartDate }}
        </div>
      </div>
    </div>
    <div class="buys">
      <div class="buys-menus">
        <div :class="tabAddPackageClass" @click="changeTab(0)">购买套餐</div>
        <div :class="tabPackageClass" @click="changeTab(1)">加油包</div>
      </div>
      <div class="buys-products" v-if="tabIndex == 1">
        <div
          :class="getRowClass(index)"
          v-for="(addpackage, index) in addPackages"
          :key="index"
          @click="selRow(index, addpackage.productCode, addpackage.price)"
        >
          <div class="product-icon">
            <img
              class="product-icon-image"
              src="../../common/images/bigflow-buys.jpeg"
            />
          </div>
          <div class="product-info">
            <div>{{ addpackage.viewName }}</div>
            <div class="meno">{{ addpackage.memo }}</div>
          </div>
          <div class="product-price">
            <div>
              <span class="price">现价：¥{{ addpackage.price }}</span>
            </div>
            <div class="old-price">原价：¥{{ addpackage.originalPrice }}</div>
          </div>
        </div>
      </div>
      <div class="buys-products" v-if="tabIndex == 0">
        <div
          :class="getRowClass(index)"
          v-for="(pkg, index) in packages"
          :key="index"
          @click="selRow(index, pkg.productCode, pkg.price)"
        >
          <div class="product-icon">
            <img
              class="product-icon-image"
              src="../../common/images/bigflow-buys.jpeg"
            />
          </div>
          <div class="product-info">
            <div>{{ pkg.productName }}</div>
            <div class="meno">{{ pkg.memo }}</div>
          </div>
          <div class="product-price">
            <div class="price">现价：¥{{ pkg.price }}</div>
            <div class="old-price">原价：¥{{ pkg.originalPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="buy-btn" @click="toPay">购买</div>
    </div>
    <div v-show="loadingShow" class="loading">
      <van-loading type="spinner" color="#FDAB16" />
    </div>
  </div>
</template>
<script>
import API from 'api/bigflow'
export default {
  data () {
    return {
      iccid: '',
      addPackages: [],
      packages: [],
      showComfirmDlg: 0,
      showAlertDlg: 0,
      selectedRow: -1,
      tabIndex: 0,
      tabAddPackageClass: 'buys-menu-selected',
      tabPackageClass: 'buys-menu',
      product2Buy: null,
      cardDetails: []
    }
  },
  created() {
    this.iccid = this.$route.query.iccid
    this.getCardDetail()
    this.getPackages()
    this.getAddPackages()
  },
  methods: {
    selRow: function(row, productCode, price) {
      this.selectedRow = row
      var product = {}
      product.iccid = this.iccid
      product.pdCode = productCode
      product.body = '套餐或加油包购买'
      product.price = price
      this.product2Buy = product
    },
    getRowClass: function(row) {
      if (this.selectedRow === row) {
        return 'buys-product-selected'
      } else {
        return 'buys-product'
      }
    },
    changeTab: function(tabIndex) {
      this.tabIndex = tabIndex
      if (this.tabIndex === 0) {
        this.tabAddPackageClass = 'buys-menu-selected'
        this.tabPackageClass = 'buys-menu'
      } else if (this.tabIndex === 1) {
        this.tabAddPackageClass = 'buys-menu'
        this.tabPackageClass = 'buys-menu-selected'
      }
      this.product2Buy = null
      this.selectedRow = -1
    },
    getAddPackages: function() {
        var params = {}
        params.iccid = this.iccid
        this.loadingShow = true
        API.apiGetAddedPackages(params).then(res => {
            if (res.resultCode === 0) {
                this.addPackages = res.data
                this.loadingShow = false
            } else {
                this.loadingShow = false
            }
        })
    },
    getPackages: function() {
        var params = {}
        params.iccid = this.iccid
        this.loadingShow = true
        API.apiGetPackages(params).then(res => {
            if (res.resultCode === 0) {
                this.packages = res.data
                this.loadingShow = false
            } else {
                this.loadingShow = false
            }
        })
    },
    getCardDetail: function() {
        var params = {}
        params.iccid = this.iccid
        this.loadingShow = true
        API.apiGetCardDetail(params).then(res => {
            if (res.resultCode === 0) {
                this.cardDetails = res.data
                this.loadingShow = false
            } else {
                this.loadingShow = false
            }
        })
    },
    order2Payed: function(product2Buy, orderId) {
      console.log(orderId)
      var params = product2Buy
      params.orderId = orderId
      API.apiBuyed(params).then(res => {
        if (res.resultCode === 0) {
          this.$toast('购买成功')
          this.getCardDetail()
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    toPay () {
      if (this.product2Buy === null) {
        this.$toast('请先选择要购买的套餐')
        return
      }
      this.$dialog.confirm({
          title: '提醒',
          message: '确认支付吗'
      }).then(() => {
        var params = {}
        params.iccid = this.iccid
        params.productCode = this.product2Buy.pdCode
        params.busiType = 0
        params.payType = 0
        API.apiCreateOrderId(params).then(res => {
        // API.apiOrderOrderId().then(res => {
          console.log('apiOrderOrderId:' + JSON.stringify(res))
          const orderId = res.data
          const data = {
            body: '套餐或加油包购买',
            out_trade_no: res.data,
            total_fee: Number(this.product2Buy.price) * 100
            // total_fee: Number(0.01) * 100
          }
          console.log('orderId:' + orderId)
          console.log('orderId:' + JSON.stringify(data))
          API.apiWXprepay(data).then(res => {
            if (res.resultCode === 0) {
                console.log('apiWXprepay:' + JSON.stringify(res.data))
              this.weixinTradePay(res.data, orderId, () => {
                this.order2Payed(this.product2Buy, orderId)
              }, () => {
                this.$toast('支付失败')
              })
            } else {
              this.$toast(res.resultInfo)
            }
          })
        })
        }).catch(() => {
        })
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
      weixinTradePay (obj, orderId, $routerFun, $routerFaildFun) {
        console.log('obj:' + obj)
        console.log('orderId:' + orderId)
        console.log('$routerFun:' + $routerFun)
        console.log('$routerFaildFun:' + $routerFaildFun)
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
                    console.log('orderId:' + orderId)
                $routerFun()
                } else if (result.err_msg === 'get_brand_wcpay_request:cancel') {
                self.$dialog.confirm({
                    title: '提醒',
                    message: '是否放弃本次支付？',
                    confirmButtonText: '确定',
                    cancelButtonText: '继续支付'
                }).then(() => {
                    $routerFaildFun()
                }).catch(() => {
                })
                } else {
                self.$toast('支付失败')
                }
            }
            )
        })
        }
  }
}
</script>
<style lang="less" scoped>
.page{
    background: #f6f6f6;
    height: 110%;
    width: 100%;
    padding-bottom: 300px;
    // font-size: 20px;
}
.head{
    height: 14%;
    margin: 30px;
    border-radius: 15px;
    background: white;
    display: flex;
    background: #4388de;
}
.head-img{
    flex: 1;
}
.head-img-image{
    width: 60px;
    height: 60px;
    margin: 20px;
    margin-left: 15px;
    border-radius: 100px;
}
.head-card{
    flex: 2;
    padding-top: 20px;
    color: white;
    font-size: 15px;
}
.detail{
    height: 35%;
    margin: 30px;
    border-radius: 15px;
    background: white;
    font-size: 15px;
    padding-top:5px;
}
.buys{
    height: 70%;
    margin: 30px;
    border-radius: 15px;
    background: white;
}
.detail-button{
    margin: 30px;
    margin-left: 10%;
    width: 80%;
    background: #4388de;
    border-radius: 15px;
    height: 50px;
    line-height: 50px;
    text-align: center;
}
.detail-title{
    // font-size: 40px;
    margin: 10px;
}
.detail-note{
    margin: 10px;
    // padding-top: 5px;
}
.buys-menus{
    display: flex;
    text-align: center;
    // font-size: 30px;
    margin: 30px;
}
.buys-menu{
    flex: 1;
    height: 50px;
    line-height: 50px;
    font-size: 15px;
}
.buys-menu-selected{
    flex: 1;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ddd;
    font-size: 15px;
}
.buys-products{
    margin: 5px;
    font-size: 15px;
}
.buys-product{
    margin: 5px;
    height: 110px;
    border-bottom: 1px solid #ddd;
    display: flex;
}
.buys-product-selected{
    margin: 5px;
    height: 110px;
    border-bottom: 1px solid #ddd;
    display: flex;
    background: #fafddb;
}
.product-icon{
    flex: 1;
}
.product-info{
    flex: 4;
    border-right: 1px solid #ddd;

}
.product-price{
    flex: 2;
    margin-left: 20px;
}
.product-icon-image{
    width: 40px;
    height: 40px;
}
.footer{
    position: fixed;
    width: 100%;
    bottom: 2%;

}
.buy-btn{
    width: 90%;
    height: 60px;
    text-align: center;
    line-height: 60px;
    margin-left: 5%;
    background: #4388de;
    border-radius: 15px;
    color: white;
    font-size: 20px;
}
.price{
    color: red;
}
.meno{
    color: gray;
}
.old-price{
    text-decoration:line-through;
    color: gray;
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
