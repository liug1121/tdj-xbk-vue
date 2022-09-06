<template>
  <div class="page">
    <div class="circle">
         <van-circle v-model="currentUsageRate" :rate="Number(usagePercent)" :speed="Number(usage)" layer-color="#ebedf0" size="200px" :color="bodyColor" :stroke-width="120" >
            <div class="circle-box">
              <div class="circle-note">当月剩余可用量</div>
              <div class="circle-last">100.00GB</div>
            </div>
          </van-circle>
          <div class="circle-usage">209.8 GB 已用</div>
    </div>
    <div class="usage-detail">
        <table>
            <tr>
                <td><img class="usage-detail-title" src="../../common/images/usage-detal.jpg" /></td>
                <td>流量明细</td>
            </tr>
        </table>
        <table class="usage_detail-contents">
            <tr>
                <td>套餐有效期：</td>
                <td class="usage-detail-content">2022.01.20-2023.01.19</td>
            </tr>
            <tr>
                <td>套餐当月可用量：</td>
                <td class="usage-detail-content">300 GB</td>
            </tr>
            <tr>
                <td>当月已购加油包可用量：</td>
                <td class="usage-detail-content">150 GB</td>
            </tr>
            <tr>
                <td>当月总可用量：</td>
                <td class="usage-detail-content">150 GB</td>
            </tr>
            <tr>
                <td>当月已用量：</td>
                <td class="usage-detail-content">150 GB</td>
            </tr>
            <tr>
                <td>当月剩余可用量：</td>
                <td class="usage-detail-content">150 GB</td>
            </tr>
        </table>
    </div>
    <div class="packages">
        <table>
            <tr>
                <td width="10%"><img class="usage-detail-title" src="../../common/images/usage-detal.jpg" /></td>
                <td width="30%">
                    套餐+流量包
                </td>
                <td class="usage-detail-content" width="80%">更多></td>
            </tr>
        </table>
        <div class="package-boxes">
            <div class="package">
                <div class="package-content">
                    <div class="package-content-name">50G加油包</div>
                    <div class="package-content-price">¥ 58</div>
                    <div class="package-content-buy">购买</div>
                </div>
            </div>
        </div>
    </div>
    <table class="package-alert">
        <tr>
            <td><img class="package-alert-image" src="../../common/images/usage-alert.jpg" /></td>
            <td>
                当月剩余可用量已经不足 XXXX GB了，为不影响您的使用，请及时购买加油包
            </td>
        </tr>
    </table>
  </div>
</template>
<script>
export default {
  data () {
    return {
        currentUsageRate: '',
        usagePercent: 10,
        usage: 0,
        bodyColor: '#FDAB16'
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
}
.usage_detail-contents{
    width: 100%;
}
.usage_detail-contents td{
    padding: 10px;
}
.usage-detail-content{
    text-align: right;
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
.package{
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
.package-content-price{
    font-size: 20px;
    font-weight:bolder;
    color: red;
    margin-bottom: 10px;
}
.package-content-buy{
    border: 1px solid black;
    border-radius:15px;
    width:60%;
    margin-left: 20%;
    margin-bottom: 10px;
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
</style>
