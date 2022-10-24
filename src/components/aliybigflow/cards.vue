<template>
  <div class="page">
    <div v-if="cards.length > 0">
        <!-- <div class="notice">
            <table>
                <tr>
                    <td>
                        <img class="notice-image" src="../../common/images/alisms.jpg" />
                    </td>
                    <td>{{notice}}</td>
                </tr>
            </table>
        </div> -->
        <div class="cards" v-for="(record, index) in cards" :key="index">
                <div class="card">
                <div v-if="record.currentMeal === ''" class="mask-notice" >您的设备还没有订购套餐。</div>
                <div v-if="record.currentMeal === ''" class="mask" >
                <table class="card-infos">
                    <tr>
                        <td>
                            <van-circle  :rate="Number(90)" :speed="Number(10)" layer-color="#fa7000" size="120px" :color="bodyColor" :stroke-width="90" >
                                <div class="circle-box">
                                <div>当月剩余可用量</div>
                                <div><span class="usage">{{record.flowSurplusUsed}}</span> <span class="unit">{{record.flowSurplusUsedUnit}}</span></div>
                                </div>
                            </van-circle>
                            <div v-if="record.nextClearDate !== null" class="card-infos-clear">下次流量重置日 </div>
                        </td>
                        <td>
                            <div class="card-infos-pkgs">
                                <div ><span class="device-name">昵称：{{record.cardName}}</span>
                                    <span v-if="record.cardStatus !== 0" class="card-status">{{record.cardStatusName}}</span>
                                    <span v-if="record.cardStatus === 0" class="card-status-gray">{{record.cardStatusName}}</span>
                                </div>
                                <div >ICCID：{{record.iccid19Format}}</div>
                                <div >IMEI：{{record.ufiImeiFormat}}</div>
                                <!-- <div >卡状态：{{record.cardStatusName}}<span class="to-cert" v-if="record.cardStatus === 0" @click="toCert(record.iccid)">去实名认证</span></div> -->
                                <div v-if="record.packageExpireDate != null && record.packageExpireDate !== ''" >套餐有效期：{{record.packageExpireDate}} > </div>
                                <div v-else >套餐有效期：无 > </div>
                                <div >未生效套餐：无</div>
                                <!-- <div v-if="record.unUsedPackages.length > 0" @click="showNextProduct(nextProductsShowed)">未生效套餐：<span class="unUsedPkg">{{record.unUsedPackages.length}}</span>个 ></div> -->
                            </div>
                        </td>
                    </tr>
                </table>
                <!-- <table class="card-titile">
                    <tr>
                        <td class="card-titile-name">设备昵称：</td>
                        <td class="card-titile-name">{{record.cardName}}</td>
                    </tr>
                </table> -->
                <div v-if="nextProductsShowed">
                    <div class="unused-packages" v-for="(pkg, pkgIndex) in record.unUsedPackages" :key="pkgIndex" >
                       <div class="pkg-name">{{pkg.packageViewName}}</div>
                        <table>
                            <tr>
                                <td>生效时间</td>
                                <td>失效时间</td>
                            </tr>
                            <tr>
                                <td>{{pkg.startDate}}</td>
                                <td>{{pkg.endDate}}</td>
                            </tr>
                            <tr>
                                <td ><span class="pkg-desc">{{pkg.areaName}}{{pkg.dose}}G，共{{pkg.expireMonth}}个月</span></td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                </div>
                </div>
                <div v-if="record.currentMeal !== ''">
                    <table class="card-infos" @click="toCardDetails(record.iccid, record.iccid19Format, record.ufiImeiFormat)">
                    <tr>
                        <td>
                            <van-circle  :rate="Number(90)" :speed="Number(10)" layer-color="#fa7000" size="120px" :color="bodyColor" :stroke-width="90" >
                                <div class="circle-box">
                                <div>当月剩余可用量</div>
                                <div><span class="usage">{{record.flowSurplusUsed}}</span> <span class="unit">{{record.flowSurplusUsedUnit}}</span></div>
                                </div>
                            </van-circle>
                            <div v-if="record.nextClearDate !== null && record.nextClearDate !== undefined" class="card-infos-clear">下次流量重置日 <div>{{record.nextClearDate}}</div></div>
                        </td>
                        <td>
                            <div class="card-infos-pkgs">
                                <div ><span class="device-name">昵称：{{record.cardName}}</span>
                                    <span v-if="record.cardStatus === 0 || record.cardStatus === 1 || record.cardStatus === 7" class="card-status-gray">{{record.cardStatusName}}</span>
                                    <span v-if="record.cardStatus !== 0 && record.cardStatus !== 1 && record.cardStatus !== 7" class="card-status">{{record.cardStatusName}}</span>
                                </div>
                                <div >ICCID：{{record.iccid19Format}}</div>
                                <div >IMEI：{{record.ufiImeiFormat}}</div>
                                <!-- <div >卡状态：{{record.cardStatusName}}<span class="to-cert" v-if="record.cardStatus === 0" @click="toCert(record.iccid)">去实名认证</span></div> -->
                                <div v-if="record.packageExpireDate != null && record.packageExpireDate !== ''" >套餐有效期：{{record.packageExpireDate}} <span class="more">更多>></span> </div>
                                <div v-else >套餐有效期：无 > </div>
                                <div v-if="record.unUsedPackages == undefined || record.unUsedPackages.length == 0" >未生效套餐：无</div>
                                <div v-if="record.unUsedPackages != undefined && record.unUsedPackages.length > 0" @click="showNextProduct(nextProductsShowed)">未生效套餐：<span class="unUsedPkg">{{record.unUsedPackages.length}}</span>个 ></div>
                            </div>
                        </td>
                    </tr>
                </table>
                <div class="to-cert" v-if="record.cardStatus === 0" @click="toCert(record.iccid19Format)">去实名认证</div>
                <!-- <table class="card-titile">
                    <tr>
                        <td class="card-titile-name">设备名称：</td>
                        <td class="card-titile-name">{{record.cardName}}</td>
                    </tr>
                </table> -->
                <div v-if="nextProductsShowed">
                    <div class="unused-packages" v-for="(pkg, pkgIndex) in record.unUsedPackages" :key="pkgIndex" >
                       <div class="pkg-name">{{pkg.packageViewName}}</div>
                        <table>
                            <tr>
                                <td>生效时间</td>
                                <td>失效时间</td>
                            </tr>
                            <tr>
                                <td>{{pkg.startDate}}</td>
                                <td>{{pkg.endDate}}</td>
                            </tr>
                            <tr>
                                <td ><span class="pkg-desc">{{pkg.areaName}}{{pkg.dose}}G，共{{pkg.expireMonth}}个月</span></td>
                                <td></td>
                            </tr>
                        </table>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
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
        bodyColor: '#FDAB16',
        nextProductsShowed: false,
        loadingShow: false,
        notice: '您的卡片已激活，可以插卡使用流量啦，如有疑问请联系官方客服咨询～',
        lastUsage: '100G',
        clearDate: '2022-09-20',
        cards: [
        ]
    }
  },
  created() {
    this.getCards()
    // if (this.isAlipayClient() === false) {
    //     this.$router.push({
    //         path: '/aliy/notaliy'
    //     })
    // } else {
    //     this.getCards()
    // }
  },
  methods: {
    toPackages: function(iccid) {
        this.$router.push({
            path: '/aliy/buyPackage',
            query: {
                iccid: iccid
            }
        })
    },
    toCardDetails: function(iccid, iccid19, imei) {
        console.log('sss')
        this.$router.push({
            path: '/aliy/cardDetail',
            query: {
                iccid: iccid,
                iccid19: iccid19,
                imei: imei
            }
        })
    },
    toCert: function(iccid) {
        this.$router.push({
            path: '/aliy/cert',
            query: {
                iccid: iccid
            }
        })
    },
    toBind: function(iccid) {
        this.$router.push({
            path: '/aliy/bind'
        })
    },
    // toNotAliyPay: function(iccid) {
    //     this.$router.push({
    //         path: '/aliy/bind'
    //     })
    // },
    showNextProduct: function(showed) {
        this.nextProductsShowed = !showed
    },
    getCards: function() {
        var params = {}
        this.loadingShow = true
        API.apiGetCards(params).then(res => {
            if (res.resultCode === 0) {
                this.cards = res.data
                if (this.cards.length < 1) {
                    this.toBind()
                }
                this.loadingShow = false
            } else {
                this.loadingShow = false
            }
        })
    }
    // ,
    // isAlipayClient: function() {
    //     if (navigator.userAgent.indexOf('AlipayClient') > -1) {
    //         return true
    //     }
    //     return false
    //     }
  }
}
</script>
<style lang="less" scoped>
.page{
    background: rgb(240, 240, 240);
    padding-top: 10px;
    // color: white;
}
.notice{
    font-size: 16px;
    border: 1px solid white;
    margin-left: 5%;
    width: 90%;
    height: 80px;
    border-radius:15px;
    text-align: left;
    padding-top: 30px;
    background: white;
    color: black;
}
.cards{
    font-size: 18px;
    // border: 1px solid white;
    margin-top: 30px;
}
.card{
    position: relative;
    font-size: 16px;
    // border: 1px solid #fff6dd;
    border-radius:15px;
    // padding: 10px;
    padding-bottom: 20px;
    padding-top: 20px;
    width: 90%;
    margin-left: 5%;
    margin-top: 10px;
    background: #ffffff;
    color: black;
}
.item{
//    border: 1px solid black;
   margin-top: 18px;
   font-weight: bolder;
   margin-left: 5%
}
.device{
    text-align: center;
    width: 100%;
    margin-top: 20px;
    padding-bottom: 20px;
}
.device-item{
    border: 0px solid white;
    color: #f59a23;
}
.card-usage{
    text-align: center;
    // border: 1px solid black;
    border-radius:15px;
    margin-top: 30px;
    padding-top: 20px;
    padding-bottom: 20px;
    background: #FDAB16;
    color: white;
    font-size: 16px;
    width: 90%;
    margin-left: 5%;

}
.tocert{
    text-align: center;
    border: 1px solid #FACD91;
    border-radius:15px;
    margin-top: 30px;
    padding-top: 20px;
    padding-bottom: 20px;
}
.tobuy{
    text-align: center;
    border: 1px solid #FACD91;
    border-radius:15px;
    margin-top: 30px;
    padding-top: 20px;
    padding-bottom: 20px;
}
.notice-image{
    width: 40px;
    height: 35px;
    margin: 5px;
}
.addcard{
    text-align: center;
    font-size: 80px;
    color: gray;
    background: silver;
}
.bind-guid{
    margin-top: 50px;
    padding-top: 30px;
    font-size: 18px;
    border: 1px solid #FACD91;
    border-radius:15px;
    width: 90%;
    margin-left: 5%;
    text-align: center;
}
.bind-guid div{
    margin-top: 10px;
}
.bind-guid img{
    width: 100px;
    height: 100px;
    margin: 80px;
}
.tobind{
    text-align: center;
    border: 1px solid black;
    border-radius:15px;
    margin-top: 30px;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 50px;
    width: 80%;
    margin-left: 10%;
}
.bind-titile{
    font-size: 25px;
}
.unused-packages{
    font-size: 18px;
    text-align: center;
    border-bottom: 1px solid #f7cdab;
    margin-top: 20px;
    padding-bottom: 20px;
}
.unused-packages table{
    width: 90%;
    margin-left: 5%;
    font-size: 15px;
}
.unused-packages td{
    border: 1px solid white;
    text-align: left;
}
.pkg-name{
    color: #fa7000;
    font-weight:bolder;
    margin-bottom: 15px;
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
.unUsedPkg{
    color: #fa7000;
    margin-left: 10px;
    margin-right: 10px;
    font-size: 18px;
    text-decoration: underline;
}
.card-titile{
    margin-top:10px;
    // margin-bottom: 10px;
    width: 100%;
    // margin-left: 5%;
    // color: #fa7000;
    background: #fa7000;
    color: white;
    text-align: center;
    border-bottom: 10px;
    // border-radius:10px;
    padding-top: 5px;
    padding-bottom: 5px;
}
.card-titile-name{
    // text-align: left;
    font-size: 16px;
    font-weight:bold;
    text-align: left;
    padding-left: 1%;
    // background: #fa7000;
    // color: white;
}
.card-titile-status{
    // text-align: right;
    font-size: 16px;
}
.circle-box{
    font-size: 13px;
    width: 80%;
    height: 80%;
    margin-left: 10%;
    margin-top: 40%;
    color: black;
    font-weight:bold;
}
.card-infos{
    margin-bottom: 15px;
    margin-left: 2.5%;
    width:95%;
}
.card-infos-pkgs{
    margin-top: 10px;
    margin-left: 5px;
    font-size: 12px;
}
.card-infos-pkgs div{
    margin-left: 1px;
    margin-top: 1px;
    margin-bottom: 15px;

    // font-weight:bold;
}
.card-infos-clear{
    font-size: 11px;
    background: #fa7000;
    text-align: center;
    margin-top: 7px;
    font-weight:bold;
    color: white;
    padding: 2px;
    border-radius:5px;
}
.pkg-desc{
    font-size: 12px;
    color: #fa7000;
    font-weight:bold;
    background: #f7cdab;
    padding-left: 3px;
    padding-right: 3px;
    padding-top: 3px;
    padding-bottom: 3px;
    border-radius:5px;
}
.mask {
 opacity: 0.15;
 z-index: 1
}
.mask-notice{
    left: 10%;
    top: 40%;
    width: 80%;
    color: #fa7000;
    position: absolute;
    font-size: 14px;
    text-align: center;
    font-weight:bold;
}
.to-cert{
    // margin-left: 10px;
    // font-weight:bold;
    background:#fa7000;
    padding: 10px;
    // padding-left: 10px;
    // padding-right: 10px;
    border-radius: 20px;
    font-size: 14px;
    color:white;
    width: 90%;
    margin-left: 2%;
    text-align: center;
}
.unit{
    font-size: 9px;
}
.device-name{
    font-weight:bold;
    font-size: 13px;
}
.card-status{
    background:#fa7000;
    border-radius:5px;
    color: white;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 40px;
    font-weight:bold;
}
.card-status-gray{
    background:gray;
    border-radius:5px;
    color: white;
    padding-left: 5px;
    padding-right: 5px;
    margin-left: 40px;
    font-weight:bold;
}
.usage{
    font-size: 18px;
}
.more{
    color: #fa7000;
    font-weight:bold;
    margin-left: 10px;
}
</style>
