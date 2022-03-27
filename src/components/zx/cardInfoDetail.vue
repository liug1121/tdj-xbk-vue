<template>
  <div class="page">
    <!-- <div class="head">
      <div class="head-card">
        <div>手机号：{{ cardDetails.phone_number }}</div>
        <div>ICCID：{{ cardDetails.iccid }}</div>
      </div>
    </div> -->
    <div class="detail">
      <div class="detail-title">卡详情</div>
      <!-- <div class="detail-button">剩余{{ cardDetails.flowSurplusUsed }}</div> -->
      <div class="detail-note">
        <div class="detail-item">手机号：{{ cardDetails.phone_number }}</div>
        <div class="detail-item">ICCID：{{ cardDetails.iccid }}</div>
        <div class="detail-item">您的套餐：{{ cardDetails.currentMeal }}</div>
        <div class="detail-item">
          有效期：{{ cardDetails.mealStartDate }} 到 {{ cardDetails.mealEndDate }}
        </div>
      </div>
    </div>
    <div class="buys">
      <div class="buys-menus">
        <div :class="tabAddPackageClass" @click="changeTab(0)">购买套餐</div>
        <div :class="tabPackageClass" @click="changeTab(1)">购买记录</div>
      </div>
      <div class="buys-products" v-if="tabIndex == 1">
        <div
          :class="getRowClass(index)"
          v-for="(buyedRecord, index) in buyedRecords"
          :key="index"
        >
          <div class="product-info">
            <div>{{ buyedRecord.productName }}</div>
            <div>{{ buyedRecord.buyedDate }}</div>
          </div>
          <div class="product-price">
            <div>
              <span class="record-price">价格：¥{{ buyedRecord.price }}</span>
            </div>
            <!-- <div class="old-price">原价：¥{{ addpackage.originalPrice }}</div> -->
          </div>
        </div>
      </div>
      <div class="buys-products" v-if="tabIndex == 0">
        <div
          :class="getRowClass(index)"
          v-for="(pkg, index) in packages"
          :key="index"
          @click="selRow(index, pkg)"
        >
          <div class="product-info">
            <div>{{ pkg.productName }}</div>
            <!-- <div>{{ pkg.memo }}</div> -->
          </div>
          <div class="product-price">
            <div class="price">现价：¥{{ pkg.price }}</div>
            <div class="old-price">原价：¥{{ pkg.originalPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="buy-btn" @click="buy">购买</div>
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
      loadingShow: false,
      tabAddPackageClass: 'buys-menu-selected',
      tabPackageClass: 'buys-menu',
      cardDetails: {},
      showComfirmDlg: 0,
      showAlertDlg: 0,
      selectedRow: -1,
      iccid: '',
      tabIndex: 0,
      product2Buy: null,
      packages: [],
      addPackages: [],
      buyedRecords: []
    }
  },
  created() {
    this.iccid = this.$route.query.iccid
    this.getCardInfos()
    this.getBuyPackages()
    this.getBuyedRecords()
  },
  methods: {
      getBuyedRecords () {
          var params = {}
          params.iccid = this.iccid
          API.apiGetBuyedRecords(params).then(res => {
            if (res.resultCode === 0) {
                this.buyedRecords = res.data
                this.loadingShow = false
            } else {
                this.loadingShow = false
            }
        })
      },
      getBuyPackages () {
          var params = {}
          params.iccid = this.iccid
          API.apiGetBuyPackages(params).then(res => {
            if (res.resultCode === 0) {
                this.packages = res.data
                this.loadingShow = false
            } else {
                this.$toast(res.resultInfo)
                this.loadingShow = false
            }
        })
      },
      getCardInfos () {
          var params = {}
          params.iccid = this.iccid
          API.apiGetCardsInfo(params).then(res => {
            if (res.resultCode === 0) {
                if (res.data.length <= 0) {
                    this.$toast('卡信息无效')
                    return
                }
                this.cardDetails = res.data[0]
                this.loadingShow = false
            } else {
                this.$toast(res.resultInfo)
                this.loadingShow = false
            }
        })
      },
      hideMsgDlg: function() {
    //   this.showComfirmDlg = 0;
    },
    hideAlertMsgDlg: function() {
    //   this.showAlertDlg = 0;
    },
    buy () {
      if (this.product2Buy === null || this.product2Buy === undefined) {
        this.$toast('请选择要购买的套餐')
        return
      }
      this.$dialog.confirm({
            title: '提醒',
            message: '确认购买该' + this.product2Buy.productName + '吗？'
        }).then(() => {
            API.apiOrderOrderId().then(res => {
              console.log('apiOrderOrderId:' + JSON.stringify(res))
              const orderId = res.data
              const data = {
                body: '套餐购买支付',
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
                      this.$toast('套餐购买成功')
                    var params = {}
                    params.iccid = this.iccid
                    params.orderId = orderId
                    params.packageId = this.product2Buy.pdCode
                    this.loadingShow = true
                    API.apiPackageBuyed(params).then(res => {
                        if (res.resultCode === 0) {
                            this.$toast('套餐购买成功')
                            this.getCardInfos()
                            this.loadingShow = false
                        } else {
                            this.$toast(res.resultInfo)
                            this.loadingShow = false
                        }
                    })
                  }, () => {
                      this.$router.push({
                      path: '/SalerPayFaild',
                      query: { orderId: orderId }
                })
                  })
                } else {
                  this.$toast(res.resultInfo)
                }
              })
            })
        }).catch(() => {
        })
    },
    buyProduct: function() {
    //   let buyParams = {};
    //   buyParams = this.product2Buy;
    //   console.log(JSON.stringify(buyParams));
    //   this.$store.dispatch("buyRecords/buy", buyParams).then(
    //     response => {
    //       if (response.data.resultCode == 0) {
    //         this.showComfirmDlg = 0;
    //         let payParams = {};
    //         payParams.appId = response.data.data.appId;
    //         payParams.timeStamp = response.data.data.timeStamp;
    //         payParams.nonceStr = response.data.data.nonceStr;
    //         payParams.package = response.data.data.pkg;
    //         payParams.paySign = response.data.data.paySign;
    //         payParams.signType = response.data.data.signType;
    //         api.weixinPay(payParams, res => {
    //           if (res.resultCode == 0) {
    //             this.alertMsg = "您已经成功购买该商品!";
    //             this.showAlertDlg = 1;
    //           } else {
    //             this.alertMsg = "支付失败，请与客服联系!";
    //             this.showAlertDlg = 1;
    //           }
    //         });
    //       } else {
    //         this.alertMsg = "您暂时不能购买该商品，请与客服联系!";
    //         this.showAlertDlg = 1;
    //         this.showComfirmDlg = 0;
    //       }
    //     },
    //     error => {
    //       console.log("2:" + JSON.stringify(error));
    //       this.alertMsg = "卡绑定失败!";
    //       this.showAlertDlg = 1;
    //       this.showComfirmDlg = 0;
    //     }
    //   );
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
        },
    selRow: function(row, selectedProduct) {
        console.log('selRow')
      this.selectedRow = row
      var product = {}
      product.iccid = this.iccid
      console.log(product.iccid)
      product.pdCode = selectedProduct.productCode
      product.body = '套餐购买'
      product.productName = selectedProduct.productName
      product.price = selectedProduct.price
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
    }
  }
}
</script>
<style lang="less" scoped>
.page{
    background: #f6f6f6;
    height: 100%;
    width: 100%;
    padding-bottom: 300px;
    padding-top: 10px;
}
.head{
    height: 80px;
    margin: 30px;
    border-radius: 15px;
    background: white;
    display: flex;
    // background: #FFBA27;
}
.head-img{
    flex: 1;
}
.head-img-image{
    width: 150px;
    height: 150px;
    margin: 20px;
    margin-left: 50px;
    border-radius: 100px;
}
.head-card{
    padding-left: 10px;
    flex: 2;
    padding-top: 20px;
    // color: white;
    font-size: 16px;
}
.detail{
    padding: 5px;
    font-size: 20px;
    height: 160px;
    margin: 30px;
    border-radius: 15px;
    background: white;
}
.buys{
    height: 70%;
    margin: 30px;
    border-radius: 15px;
    background: white;
}
.detail-button{
    margin: 15px;
    margin-left: 10%;
    width: 80%;
    background: #FFBA27;
    border-radius: 15px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
}
.detail-title{
    font-size: 22px;
    margin: 15px;
}
.detail-note{
    margin: 15px;
    font-size: 16px;
}
.buys-menus{
    display: flex;
    text-align: center;
    font-size: 20px;
    margin:30px;
}
.buys-menu{
    flex: 1;
    height: 50px;
    line-height: 50px;
}
.buys-menu-selected{
    flex: 1;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ddd;
}
.buys-products{
    margin: 5px;
}
.buys-product{
    margin: 5px;
    height: 50px;
    border-bottom: 1px solid #ddd;
    display: flex;
}
.buys-product-selected{
    margin: 5px;
    height: 50px;
    border-bottom: 1px solid #ddd;
    display: flex;
    background: #fafddb;
}
.product-icon{
    flex: 1;
}
.product-info{
    flex: 2;
    border-right: 1px solid #ddd;
    font-size: 15px;
}
.product-price{
    flex: 1;
    margin-left: 20px;
    font-size: 15px;
}
.product-icon-image{
    width: 80px;
    height: 80px;
}
.footer{
    position: fixed;
    width: 100%;
    top: 93%;

}
.buy-btn{
    width: 90%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    margin-left: 5%;
    background: #FFBA27;
    border-radius: 15px;
    color: white;
    font-size: 20px;
}
.price{
    color: red;
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
.detail-item {
    margin: 5px;
}
.record-price{
    margin-top: 10px;
    color: #FFBA27;
}
</style>
