<template>
  <div class="page">
    <div class="packages">
        <div class="main-packages">
            <div class="package-title">套餐</div>
            <div>
                <table>
                    <tr v-for="(rowPackages, index) in divisionaledPackages" :key="index">
                        <td v-if="rowPackages.length >= 1" @click="selectPkgId(0,index, 0,rowPackages[0])">
                            <div :class=getPkgClass(0,index,0,0)>
                                <!-- <img class="package-content-selected" src="../../common/images/QK_img_icon.png" /> -->
                                <div class="package-content">
                                    <div :class=getPkgClass(0,index,0,1)>{{rowPackages[0].productName}}</div>
                                    <div class="package-content-price">¥ {{rowPackages[0].price}}</div>
                                    <div class="package-content-buy">{{rowPackages[0].expireDate}}个月</div>
                                </div>
                            </div>
                        </td>
                        <td v-if="rowPackages.length >= 2" @click="selectPkgId(0,index , 1,rowPackages[1])">
                            <div :class=getPkgClass(0,index,1,0)>
                                <div class="package-content">
                                    <div :class=getPkgClass(0,index,1,1)>{{rowPackages[1].productName}}</div>
                                    <div class="package-content-price">¥ {{rowPackages[1].price}}</div>
                                    <div class="package-content-buy">{{rowPackages[1].expireDate}}个月</div>
                                </div>
                            </div>
                        </td>
                        <td v-if="rowPackages.length >= 3" @click="selectPkgId(0,index , 2,rowPackages[2])">
                            <div :class=getPkgClass(0,index,2,0)>
                                <div class="package-content">
                                    <div :class=getPkgClass(0,index,2,1)>{{rowPackages[2].productName}}</div>
                                    <div class="package-content-price">¥ {{rowPackages[2].price}}</div>
                                    <div class="package-content-buy">{{rowPackages[2].expireDate}}个月</div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="added-packages">
            <div class="package-title">加油包</div>
            <div>
                <table>
                    <tr v-for="(rowAddPackages, index) in divisionaledAddedPackages" :key="index">
                        <td v-if="rowAddPackages.length >= 1" @click="selectPkgId(1,index , 0,rowAddPackages[0])">
                            <div :class=getPkgClass(1,index,0,0)>
                                <div class="package-content">
                                    <div :class=getPkgClass(1,index,0,1)>{{rowAddPackages[0].productName}}</div>
                                    <div class="package-content-price">¥ {{rowAddPackages[0].price}}</div>
                                    <div class="package-content-buy">当月有效</div>
                                </div>
                            </div>
                        </td>
                        <td v-if="rowAddPackages.length >= 2" @click="selectPkgId(1,index , 1,rowAddPackages[1])">
                            <div :class=getPkgClass(1,index,1,0)>
                                <div class="package-content">
                                    <div :class=getPkgClass(1,index,1,1)>{{rowAddPackages[1].productName}}</div>
                                    <div class="package-content-price">¥ {{rowAddPackages[1].price}}</div>
                                    <div class="package-content-buy">当月有效</div>
                                </div>
                            </div>
                        </td>
                        <td v-if="rowAddPackages.length >= 3" @click="selectPkgId(1,index , 2,rowAddPackages[2])">
                            <div :class=getPkgClass(1,index,2,0)>
                                <div class="package-content">
                                    <div :class=getPkgClass(1,index,2,1)>{{rowAddPackages[2].productName}}</div>
                                    <div class="package-content-price">¥ {{rowAddPackages[2].price}}</div>
                                    <div class="package-content-buy">当月有效</div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
    <div class="package-desc">
        <div class="package-desc-title">套餐说明</div>
        <div>
            <table>
                <tr>
                    <td>套餐价格</td>
                    <td class="package-desc-content">{{selectedPkg.price}}元</td>
                </tr>
                <tr>
                    <td>套餐内总可用量</td>
                    <td class="package-desc-content">{{selectedPkg.totalDose}}</td>
                </tr>
                <!-- <tr>
                    <td>每月可用量</td>
                    <td class="package-desc-content">100GB</td>
                </tr> -->
            </table>
        </div>
    </div>
    <div class="package-desc">
        <div class="package-desc-title">套餐详情</div>
        <div class="package-desc-detail">
            <div class="package-desc-detail-item">1. 首次购买套餐后如未及时完成SIM卡的实名认证，套餐自购买日起第11个自然日将自动生效并开始计费，未完成实名认证的SIM卡无法正常连接网络。为保证正常使用，请购买套餐后尽快在10个自然日内完成SIM卡实名认证；</div>
            <div class="package-desc-detail-item">2. 月计费周期：首月为个人实名之日起（或套餐自动生效之日）起至次月本日零时止，后续月计费周期按首月计费周期时间顺延；</div>
            <div class="package-desc-detail-item">3. 月包套餐有效期为：1个“月计费周期”；半年包套餐有效期为：6个“月计费周期”；年包套餐有效期为：12个“月计费周期”；</div>
            <div class="package-desc-detail-item">4. 如连续订购多个套餐，后订购的套餐将按照订购顺序在前套餐有效期到期后自动生效，已生效套餐无法变更成其它套餐；</div>
            <div class="package-desc-detail-item">5. 加油包仅当月计费周期内有效，不结转至下个月计费周期。套餐及加油包购买后不支持退款；</div>
            <div class="package-desc-detail-item">6. 半年包/年包套餐每个月计费周期开始时会重置本月计费周期内的可用用量，本月计费周期未使用流量不结转到下个周期，当月计费周期流量使用量超过当月最大可用量（当月计费周期套内流量+加油包）时将无法继续连接网络，用户订购加油包后立即恢复；</div>
            <div class="package-desc-detail-item">7. 套餐/加油包中包含的流量除高风险管控地区外全国大陆地区通用（香港、澳门、台湾无法使用）；</div>
            <div class="package-desc-detail-item">8. 高风险管控地区：根据运营商相关规定将不定期调整高风险管控地区，包括且不限于新疆、西藏、云南、广西等。</div>
        </div>
    </div>
    <div class="pay-btn" @click="toBuy">立即支付</div>
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
        divisionaledAddedPackages: [],
        divisionaledPackages: [],
        packages: [],
        addPackages: [],
        iccid: '',
        loadingShow: false,
        selPkgId: 0 + '-' + 0 + '-' + 0
    }
  },
  created() {
    this.iccid = this.$route.query.iccid
    this.getAddPackages()
    this.getPackages()
  },
  methods: {
    toBuy: function(product) {
        console.log(JSON.stringify(this.selectedPkg))
        this.$dialog.confirm({
            title: '提醒',
            message: '确认购买 ' + this.selectedPkg.viewName + '吗？'
        }).then(() => {
            this.loadingShow = true
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
                    // this.getCardDetails()
                    } else {
                    this.$toast(res.resultInfo)
                    }
                    this.loadingShow = false
                })
            })
        }).catch(() => {
        })
    },
    selectPkgId: function(pkgType, row, column, pkg) {
        this.selPkgId = pkgType + '-' + row + '-' + column
        this.selectedPkg = pkg
    },
    getPkgClass: function(pkgType, row, column, type) {
        if (this.selPkgId === pkgType + '-' + row + '-' + column) {
            if (type === 0) {
                return 'package-selected'
            } else if (type === 1) {
                return 'package-content-name-selected'
            }
        } else {
            if (type === 0) {
                return 'package-unselected'
            } else if (type === 1) {
                return 'package-content-name'
            }
        }
    },
    divisionalAddedPackages: function(addPackages) {
        var divisionaledAddedPackages = []
        var index = 0
        addPackages.forEach(pkg => {
            if (divisionaledAddedPackages.length < index + 1) {
                divisionaledAddedPackages.push([])
            }
            var rowPkgs = divisionaledAddedPackages[index]
            if (rowPkgs.length < 3) {
                rowPkgs.push(pkg)
            } else {
                index = index + 1
            }
        })
        this.divisionaledAddedPackages = divisionaledAddedPackages
        console.log(JSON.stringify(this.divisionaledAddedPackages))
    },
    divisionalPackages: function(packages) {
        var divisionaledPackages = []
        var index = 0
        packages.forEach(pkg => {
            if (divisionaledPackages.length < index + 1) {
                divisionaledPackages.push([])
            }
            var rowPkgs = divisionaledPackages[index]
            if (rowPkgs.length < 3) {
                rowPkgs.push(pkg)
            } else {
                index = index + 1
            }
        })
        this.divisionaledPackages = divisionaledPackages
        // console.log(JSON.stringify(this.divisionaledPackages))
    },
    getAddPackages: function() {
        var params = {}
        params.iccid = this.iccid
        this.loadingShow = true
        API.apiGetAddedPackages(params).then(res => {
            if (res.resultCode === 0) {
                this.addPackages = res.data
                this.divisionalAddedPackages(this.addPackages)
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
                if (this.packages.length > 0) {
                    this.selectedPkg = this.packages[0]
                }
                this.divisionalPackages(this.packages)
                this.loadingShow = false
            } else {
                this.loadingShow = false
            }
        })
    }
  }
}
</script>
<style lang="less" scoped>
.page{
    background: silver;
}
.package-title{
    font-weight:bolder;
    padding-top: 30px;
    padding-left: 10px;
    color: #f59a23;
}
.packages{
    background: white;
    font-size: 18px;
    width: 99%;
    margin-left: 0.5%;
}
.added-packages{
    margin-top: 20px;
}
.package-selected{
    width: 110px;
    height: 110px;
    border: 1px solid #f59a23;
    border-radius:15px;
    text-align: center;
    margin: 5px;
}
.package-unselected{
    width: 110px;
    height: 110px;
    border: 1px solid #aaa;
    border-radius:15px;
    text-align: center;
    margin: 5px;
}
.package-content{
    margin-top: 12px;
}
.package-content-name{
    font-weight:bolder;
    margin-bottom: 10px;
    font-size: 13px;
}
.package-content-name-selected{
    font-weight:bolder;
    margin-bottom: 10px;
    color: #f59a23;
    font-size: 13px;
}
.package-content-price{
    font-size: 15px;
    font-weight:bolder;
    color: red;
    margin-bottom: 10px;
}
.package-content-buy{
    border: 0px solid black;
    border-radius:15px;
    width:60%;
    margin-left: 20%;
    // margin-bottom: 18px;
    font-size: 14px;
}
.package-desc{
    font-size: 15px;
    background: white;
    width: 99%;
    margin-left: 0.5%;
    margin-top: 5px;
    padding-top: 20px;
}
.package-desc-title{
    font-size: 18px;
    font-weight:bolder;
    margin-left: 10px;
    color: #f59a23;
}

.package-desc table{
    width: 95%;
    margin: 2.5%;
    padding-bottom: 30px;
}
.package-desc-content{
    text-align: right;
}
.package-desc-detail{
    margin: 30px;
    padding-bottom: 30px;
}
.package-desc-detail-item{
    margin: 5px;
    color:#aaa;
}
.pay-btn{
    position: fixed;
    width: 60%;
    bottom: 2%;
    border: 1px solid #FDAB16;
    text-align: center;
    font-size: 25px;
    border-radius:15px;
    margin-left: 20%;
    background: #FDAB16;
    padding: 10px;
    color: white;
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

// .package-content-selected{
//     width: 20px;
//     height: 20px;
//     position: inherit;
//     left: 0px;
//     // top: 100%;
// }
</style>
