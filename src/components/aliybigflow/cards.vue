<template>
  <div class="page">
    <div v-if="cards.length > 0">
        <div class="notice">
            <table>
                <tr>
                    <td>
                        <img class="notice-image" src="../../common/images/smsIcon.png" />
                    </td>
                    <td>{{notice}}</td>
                </tr>
            </table>
        </div>
        <div class="cards" v-for="(record, index) in cards" :key="index">
            <div class="card">
                <div class="item">
                    <table class="device">
                        <tr>
                            <td class="device-item">{{record.deviceName}}</td>
                            <td class="device-item">{{record.cardCertStatus}}</td>
                        </tr>
                    </table>
                </div>
                <div class="item">{{record.iccid}}</div>
                <div class="item">当前套餐有效期：{{record.validPeriod}} ></div>
                <div class="item">{{record.nextPackageDesc}} ></div>
                <div class="unused-packages" v-for="(pkg, pkgIndex) in record.nextPackages" :key="pkgIndex">
                    <div class="pkg-name">{{pkg.name}}</div>
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
                            <td>{{pkg.viewName}}</td>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <div></div>
                <div class = "card-usage" v-if="record.cardStatus===1">
                    <div>当月剩余可用量</div>
                    <div>{{lastUsage}}</div>
                    <div>下次可用量重置日:{{clearDate}}</div>
                </div>
                <div class = "tocert" v-if="record.cardStatus===0">
                    <div>去实名认证</div>
                </div>
                <div class = "tobuy" v-if="record.cardStatus===2">
                    <div>购买套餐</div>
                </div>
            </div>
        </div>
        <div class="addcard" >+</div>
    </div>
    <div v-else>
        <div class="bind-guid">
            <div class="bind-titile">暂无SIM卡</div>
            <div>如您已拥有XXX物联网设备及配套的SIM卡，您可以点击激活</div>
            <div>
                <img  src="../../common/images/bindGuid.jpg" />
            </div>
            <div class = "tobind">
                <div>去实名认证</div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
        notice: '您的卡片已激活，可以插卡使用流量啦，如有疑问请联系官方客服咨询～',
        lastUsage: '100G',
        clearDate: '2022-09-20',
        cards: [
            {
                deviceName: 'CPE设备',
                cardCertStatus: '已实名',
                cardStatus: 1,
                iccid: '89860919720022618536',
                validPeriod: '2022-09-20',
                nextPackageDesc: '未生效套餐：2个',
                nextPackages: [
                    {
                        name: '半年包套餐',
                        startDate: '2022-09-20',
                        endDate: '2022-09-20',
                        viewName: '全国流量300G，共6个月'
                    },
                    {
                        name: '月套餐',
                        startDate: '2022-09-20',
                        endDate: '2022-09-20',
                        viewName: '全国流量300G，共6个月'
                    }
                ]
            }
        ]
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.page{
    background: silver;
    padding-top: 10px;
    // color: white;
}
.notice{
    font-size: 18px;
    border: 1px solid white;
    margin-left: 5%;
    width: 90%;
    height: 80px;
    border-radius:15px;
    text-align: center;
    padding-top: 20px;
    background: white;
    color: #aaa;
}
.cards{
    font-size: 18px;
    // border: 1px solid white;
    margin-top: 10px;
}
.card{
    font-size: 18px;
    // border: 1px solid #fff6dd;
    border-radius:15px;
    padding: 10px;
    width: 85%;
    margin-left: 5%;
    margin-top: 10px;
    background: white;
    color: #aaa;
}
.item{
//    border: 1px solid black;
   margin-top: 8px;
   font-weight: bolder;
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
    width: 25px;
    height: 25px;
    margin: 5px;
}
.addcard{
    text-align: center;
    font-size: 80px;
    color: gray;
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
    border: 1px solid white;
    margin-top: 20px;
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
    color: #f59a23;
    font-weight:bolder;
}
</style>
