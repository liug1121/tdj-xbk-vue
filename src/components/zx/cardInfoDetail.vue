<template>
  <div class="page">
    <div class="head">
      <div class="head-card">
        <div>手机号：{{ cardDetails.phone_number }}</div>
        <div>ICCIC编码：{{ cardDetails.iccid }}</div>
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
          @click="selRow(index, addpackage.productCode)"
        >
          <div class="product-icon">
            <!-- <img
              class="product-icon-image"
              src="../../assets/bigflow-buys.jpeg"
            /> -->
          </div>
          <div class="product-info">
            <div>{{ addpackage.viewName }}</div>
            <div>{{ addpackage.memo }}</div>
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
          @click="selRow(index, pkg.productCode)"
        >
          <div class="product-icon">
            <!-- <img
              class="product-icon-image"
              src="../../assets/bigflow-buys.jpeg"
            /> -->
          </div>
          <div class="product-info">
            <div>{{ pkg.productName }}</div>
            <div>{{ pkg.memo }}</div>
          </div>
          <div class="product-price">
            <div class="price">现价：¥{{ pkg.price }}</div>
            <div class="old-price">原价：¥{{ pkg.originalPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="buy-btn" @click="shouBuy">购买</div>
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
      addPackages: []
    }
  },
  created() {
      this.iccid = this.$route.query.iccid
    this.getCardInfos()
  },
  methods: {
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
    shouBuy: function() {
    //   if (this.product2Buy == null) {
    //     this.alertMsg = "请选择您要购买的商品!";
    //     this.showAlertDlg = 1;
    //     return;
    //   }
    //   this.showComfirmDlg = 1;
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
    selRow: function(row, productCode) {
    //   this.selectedRow = row;
    //   let product = {};
    //   product.iccid = this.iccid;
    //   product.pdCode = productCode;
    //   product.body = "套餐购买";
    //   this.product2Buy = product;
    },
    getRowClass: function(row) {
    //   if (this.selectedRow == row) {
    //     return "buys-product-selected";
    //   } else {
    //     return "buys-product";
    //   }
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
    },
    getDetails: function(iccid) {
    //   let queryParams = {};
    //   queryParams.iccid = iccid;
    //   this.$store.dispatch("card/getCardDetails", queryParams);
    },
    getAddPackages: function(iccid) {
    //   let queryParams = {};
    //   queryParams.iccid = iccid;
    //   this.$store.dispatch(
    //     "bigFlowPackage/callAddPackagesForCard",
    //     queryParams
    //   );
    },
    getPackages: function(iccid) {
    //   let queryParams = {};
    //   queryParams.iccid = iccid;
    //   this.$store.dispatch("bigFlowPackage/callPackagesForCard", queryParams);
    }
    //   getCardInfos () {
    //       var params = {}
    //       API.apiGetCardsInfo(params).then(res => {
    //         if (res.resultCode === 0) {
    //             this.cardInfos = res.data
    //             if (this.cardInfos.length > 0) {
    //                 this.bindStatus = 1
    //             }
    //             this.loadingShow = false
    //         } else {
    //             this.$toast(res.resultInfo)
    //             this.loadingShow = false
    //         }
    //     })
    //   },
    // toBind () {
    //   this.$router.push({
    //         path: '/ZxBind'
    //       })
    // },
    // toDetail (iccid) {
    //     this.$router.push({
    //         path: '/ZxCardInfoDetail'
    //       })
    // }
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
    font-size: 20px;
    height: 200px;
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
    font-size: 25px;
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
    height: 80px;
    text-align: center;
    line-height: 80px;
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
</style>
