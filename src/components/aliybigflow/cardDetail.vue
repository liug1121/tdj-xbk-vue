<template>
  <div class="page">
    <div class="circle">
         <van-circle v-model="currentUsageRate" :rate="Number(cardDetails.usagePercent)" :speed="Number(usage)" layer-color="#ebedf0" size="200px" :color="bodyColor" :stroke-width="120" >
            <div class="circle-box">
              <div class="circle-note">当月剩余可用量</div>
              <div class="circle-last">{{cardDetails.flowSurplusUsed}}</div>
            </div>
          </van-circle>
          <div class="circle-usage">{{cardDetails.flowTotalUsedG}}已用</div>
    </div>
    <div class="usage-detail">
        <table>
            <tr>
                <td><img class="usage-detail-title" src="../../common/images/usage-detal.jpg" /></td>
                <td class="usage-detail-title-name">流量明细</td>
            </tr>
        </table>
        <table class="usage_detail-contents">
            <tr>
                <td>套餐有效期：</td>
                <td class="usage-detail-content">{{cardDetails.mealStartDate}}-{{cardDetails.mealEndDate}}</td>
            </tr>
            <tr>
                <td>套餐当月可用量：</td>
                <td class="usage-detail-content">{{cardDetails.flowTotalDoseG}}</td>
            </tr>
            <!-- <tr>
                <td>当月已购加油包可用量：</td>
                <td class="usage-detail-content">150 GB</td>
            </tr> -->
            <!-- <tr>
                <td>当月总可用量：</td>
                <td class="usage-detail-content">150 GB</td>
            </tr> -->
            <tr>
                <td>当月已用量：</td>
                <td class="usage-detail-content">{{cardDetails.flowTotalUsedG}}</td>
            </tr>
            <tr>
                <td>当月剩余可用量：</td>
                <td class="usage-detail-content">{{cardDetails.flowSurplusUsed}}</td>
            </tr>
        </table>
    </div>
    <div class="packages">
        <table>
            <tr @click="toPackages">
                <td width="10%"><img class="usage-detail-title" src="../../common/images/usage-detal.jpg" /></td>
                <td class="usage-detail-title-name" width="30%" >
                    套餐+流量包
                </td>
                <td class="usage-detail-content" width="80%">更多></td>
            </tr>
        </table>
        <div class="package-boxes" v-if="addedPacakgesToBuy.length > 0">
            <table>
                <tr>
                    <td>
                        <div :class=getPkgClass(0,0) @click="selectPkgId(0,addedPacakgesToBuy[0])">
                            <div class="package-content">
                                <div :class=getPkgClass(0,1)>{{addedPacakgesToBuy[0].viewName}}</div>
                                <div class="package-content-price">¥ {{addedPacakgesToBuy[0].price}}</div>
                                <div :class=getPkgClass(0,2)>购买</div>
                            </div>
                        </div>
                    </td>
                    <td>
                        <div :class=getPkgClass(1,0) v-if="addedPacakgesToBuy[1]" @click="selectPkgId(1, addedPacakgesToBuy[1])">
                            <div class="package-content">
                                <div :class=getPkgClass(1,1)>{{addedPacakgesToBuy[1].viewName}}</div>
                                <div class="package-content-price">¥ {{addedPacakgesToBuy[1].price}}</div>
                                <div :class=getPkgClass(1,2)>购买</div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
            <div class="buy-btn"><span class="buy-btn-text" @click="toBuy">立即购买</span></div>
        </div>
    </div>
    <table class="package-alert" v-if="cardDetails.showUsedAlert">
        <tr>
            <td><img class="package-alert-image" src="../../common/images/usage-alert.jpg" /></td>
            <td>
                当月剩余可用量已经不足 XXXX GB了，为不影响您的使用，请及时购买加油包
            </td>
        </tr>
    </table>
    <div v-show="loadingShow" class="loading">
      <van-loading type="spinner" color="#FDAB16" />
    </div>
  </div>
</template>
<script>
import API from 'api/aliy'
export default {
  data () {
    return {
        selectedPkg: {},
        selPkgId: 0,
        type: 0,
        selectContentId: 0,
        addedPacakgesToBuy: [],
        loadingShow: false,
        cardDetails: {},
        iccid: '',
        currentUsageRate: '',
        usagePercent: 10,
        usage: 0,
        bodyColor: '#FDAB16'
    }
  },
  created() {
    this.iccid = this.$route.query.iccid
    this.getCardDetails()
    this.getAddedPackages()
  },
  methods: {
    toPackages: function(iccid) {
        this.$router.push({
            path: '/aliy/buyPackage',
            query: {
                iccid: this.iccid
            }
        })
    },
    selectPkgId: function(selectId, pkg) {
        this.selPkgId = selectId
        this.selectContentId = selectId
        this.selectedPkg = pkg
    },
    getPkgClass: function(selectId, type) {
        if (this.selPkgId === selectId) {
            if (type === 0) {
                return 'package-selected'
            } else if (type === 1) {
                return 'package-content-name-selected'
            } else if (type === 2) {
                return 'package-content-buy-selected'
            }
        } else {
            if (type === 0) {
                return 'package-unselect'
            } else if (type === 1) {
                return 'package-content-name-unselect'
            } else if (type === 2) {
                return 'package-content-buy-unselect'
            }
        }
    },
    getPkgContentClass: function(selectId) {
        if (this.selectContentId === selectId) {
            return 'package-content-name-selected'
        } else {
            return 'package-content-name-unselect'
        }
    },
    getAddedPackages: function() {
        var params = {}
        params.iccid = this.iccid
        this.loadingShow = true
        console.log('getAddedPackages')
        API.apiGetAddedPackages(params).then(res => {
            if (res.resultCode === 0) {
                this.addedPacakgesToBuy = res.data
                if (this.addedPacakgesToBuy !== undefined && this.addedPacakgesToBuy.length > 0) {
                    this.selectedPkg = this.addedPacakgesToBuy[0]
                }
                this.loadingShow = false
            } else {
                this.loadingShow = false
            }
        })
    },
    getCardDetails: function() {
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
    toBuy: function(product) {
        this.$dialog.confirm({
            title: '提醒',
            message: '确认购买 ' + this.selectedPkg.viewName + '吗？'
        }).then(() => {
            API.apiOrderOrderId().then(res => {
                console.log('apiOrderOrderId:' + JSON.stringify(res))
                const orderId = res.data
                var params = {}
                params.orderId = orderId
                params.iccid = this.iccid
                params.pdCode = this.selectedPkg.productCode
                params.body = '套餐购买'
                params.orderId = orderId
                API.apiBuyed(params).then(res => {
                    if (res.resultCode === 0) {
                    this.$toast('购买成功')
                    this.getCardDetails()
                    } else {
                    this.$toast(res.resultInfo)
                    }
                })
            })
        }).catch(() => {
        })
    }
  }
}
</script>
<style lang="less" scoped>
.page{
    background: silver;
}
.circle{
    padding-top: 10%;
    margin-left: 0.5%;
    // border: 1px solid black;
    width: 99%;
    height: 200px;
    text-align: center;
    // margin-top: 10%;
    background: white;
    // border-radius:15px;
}
.circle-box{
    font-size: 15px;
    border: 1px solid white;
    width: 60%;
    height: 60%;
    margin-left: 20%;
    margin-top: 20%;
    color: #aaa;
}
.circle-note{
    margin-top: 30%;
    margin-bottom: 10px;
}
.circle-last{
    font-size: 18px;
    font-weight:bolder;
}
.circle-usage{
    font-size: 15px;
    width: 100%;
    font-weight:bolder;
    background: white;
    padding-top: 10px;
    padding-bottom: 10px;
    // color: #aaa;
}
.usage-detail{
    font-size: 15px;
    width: 99%;
    border: 0px solid black;
    margin-left: 0.5%;
    margin-top: 50px;
    background: white;
    // border-radius:15px;
}
.usage-detail-title{
    width: 20px;
    height: 30px;
    margin: 10px;
    // color: #f59a23;
}
.usage-detail-title-name{
    color: #f59a23;
}
.usage_detail-contents{
    width: 100%;
    color: #aaa;
}
.usage_detail-contents td{
    padding: 10px;
}
.usage-detail-content{
    text-align: right;
    padding-right: 10px;
}
.packages{
    width: 99%;
    margin-left: 0.5%;
    background: white;
    font-size: 15px;
}
.packages table{
    width: 100%;
}
.package-boxes{
    padding-left: 20px;
    padding-bottom: 20px;
}
.package-selected{
    width: 120px;
    height: 120px;
    border: 1px solid #f59a23;
    border-radius:15px;
    text-align: center;
}
.package-unselect{
    width: 120px;
    height: 120px;
    border: 1px solid black;
    border-radius:15px;
    text-align: center;
}
.package-content{
    margin-top: 20px;
}
.package-content-name{
    font-weight:bolder;
    margin-bottom: 10px;
}
.package-content-name-selected{
    font-weight:bolder;
    margin-bottom: 10px;
    color: #f59a23;
}
.package-content-name-unselect{
    font-weight:bolder;
    margin-bottom: 10px;
    color: black;
}
.package-content-price{
    font-size: 20px;
    font-weight:bolder;
    color: red;
    margin-bottom: 10px;
}
.package-content-buy-unselect{
    // border: 1px solid black;
    border-radius:15px;
    width:60%;
    margin-left: 20%;
    margin-bottom: 10px;
    color: black;
}
.package-content-buy-selected{
    border-radius:15px;
    width:60%;
    margin-left: 20%;
    margin-bottom: 10px;
    color: #f59a23;
}
.package-alert{
    font-size: 15px;
    margin: 10px;
    padding-bottom: 50px;
}
.package-alert-image{
    width: 30px;
    height: 30px;
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
.buy-btn{
    border-radius:15px;
    background: #f59a23;
    width: 50%;
    height: 40px;
    text-align: center;
    font-size: 20px;
    padding-top: 10px;
    color: white;
    margin-left: 20%;
    margin-top: 15px;
}
</style>
