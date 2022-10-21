<template>
  <div class="page">
    <div class="process">
        <table>
            <tr>
                <td><img  src="../../common/images/process-sim.jpg" /><div>添加卡</div></td>
                <td class="mask"><img  src="../../common/images/process-cert.jpg" /><div>实名认证</div></td>
            </tr>
        </table>
    </div>
    <span class="demo-title">示意图</span>
    <div class="card-wrapp">
        <div class="card">
        </div>
    </div>
    <div class="notice">扫描设备上的ICCID条形码，开始添加</div>
    <div class = "bind">
        <div @click="scan">扫一扫添加</div>
    </div>
    <table>
        <tr>
            <td>
                ICCID<span>*</span>
            </td>
            <td>
                <input v-model="iccid19" type="tel"/>
            </td>
        </tr>
        <tr>
            <td>
                卡命名：
            </td>
            <td>
                <input v-model="cardName"/>
            </td>
        </tr>
    </table>
    <div class = "next">
        <div @click="bind">下一步</div>
    </div>
    <div v-show="loadingShow" class="loading">
      <van-loading type="spinner" color="#FDAB16" />
    </div>
  </div>
</template>
<script>
import API from 'api/aliy'
import alipay from 'common/js/alipayjsapi.inc.min'
export default {
  data () {
    return {
        loadingShow: false,
        iccid19: '',
        cardName: ''
    }
  },
  mounted() {
  },
  created() {
    console.log(alipay)
  },
  methods: {
    scan: function() {
        alipay.scan().then((res) => {
            console.log('scan code: ' + res.code)
            if (res.code.length !== 19) {
                var params = {}
                params.imei = res.code
                this.loadingShow = true
                API.apiGetIccid19(params).then(res => {
                    if (res.resultCode === 0) {
                        this.iccid19 = res.data
                        this.loadingShow = false
                    } else {
                        this.loadingShow = false
                        this.$toast('绑定失败：' + res.resultInfo)
                    }
                })
            } else {
                this.iccid19 = res.code
            }
        })
    },
    bind: function() {
        // window.location.href = 'alipays://platformapi/startapp?appId=20000042&publicBizType=LIFE_APP&publicId=2021002105630076'
        if (this.iccid19 === null || this.iccid19 === '' || this.iccid19.length !== 19) {
            this.$toast('请输入19位iccid')
            return
        }
        // if (this.cardName === null || this.cardName === '' || this.cardName.length > 10) {
        //     this.$toast('卡名称不能超过10个字')
        //     return
        // }
        this.$dialog.confirm({
            title: '提醒',
            message: '确认进行该操作吗？'
        }).then(() => {
            var params = {}
            params.iccid = this.iccid19
            params.cardName = this.cardName
            this.loadingShow = true
            API.apiBind(params).then(res => {
                if (res.resultCode === 0) {
                    this.$toast('绑定成功')
                    this.loadingShow = false
                    var authStatus = res.data.authStatus
                    if (authStatus === 'authedSuccess') {
                        this.toCards()
                    } else {
                        this.toCert(res.data.iccid19)
                    }
                    // if (res.data.authStatus === 'uncertified') {
                    //     // this.toCert()
                    // } else {
                    //     // this.toUsgeInfo()
                    // }
                    // this.getCards()
                } else {
                    this.loadingShow = false
                    this.$toast('绑定失败：' + res.resultInfo)
                }
            })
        }).catch(() => {
        })
    },
    toCards: function() {
        this.$router.push({
            path: '/aliy/cards'
        })
    },
    toCert: function(iccid) {
        this.$router.push({
            path: '/aliy/cert',
            query: {
                iccid: iccid
            }
        })
    }
  }
}
</script>
<style lang="less" scoped>
.page{
    font-size: 16px;
}
.card-wrapp{
    margin:10%;
    margin-top:10px;
    width: 80%;
    // height: 4.1rem;
    height: 220px;
    border: 0.5px solid gray;
    border-radius:5px;
}
.card{
    margin-left: 3px;
    width: 5.8rem;
    height: 4.0rem;
    display:block;
    background:url(../../common/images/ufi-demo.jpg) no-repeat 100% 100%;
    background-size:contain;
}
.notice{
    width: 80%;
    margin-left: 10%;
    color: black;
}
.bind{
    text-align: center;
    border: 1px solid #fa7000;
    border-radius:15px;
    margin-top: 30px;
    padding-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 50px;
    width: 80%;
    margin-left: 10%;
    background: #fa7000;
    color: white;
}
.page table{
    margin: 15px;
}
.page input{
    border:1px solid #dadada;
    // background: gray;
    height: 40px;
    margin-left: 20px;
    width: 100%;
}
.next{
    text-align: center;
    border: 1px solid #fa7000;
    border-radius:15px;
    margin-top: 30px;
    padding-top: 15px;
    padding-bottom: 15px;
    margin-bottom: 50px;
    width: 80%;
    margin-left: 10%;
    background: #fa7000;
    color: white;
}
tr{
    height: 50px;
}
span{
    color: red;
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
.process{
    width: 98%;
    margin-left: 1%;
    margin-top: 1px;
    height: 100px;
    // background: gray;
    margin-bottom: 10px;
    border: 0.5px solid #fa7000;
    border-radius:5px;
}
.demo-title{
    margin-left: 10%;
    color: black;
    font-weight:bold;
}
.process img{
    width: 30px;
    height: 30px;
}
.process table{
    width: 90%;
    // background: gray;
    text-align: center;
    color: #fa7000;
    font-size: 14px;
}
.mask {
 opacity: 0.30;
 z-index: 1
}
</style>
