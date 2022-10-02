<template>
  <div class="page">
    <div class="card"></div>
    <div class="notice">扫描SIM卡上的ICCID条形码，开始添加，PUK码可刮开涂层后查看</div>
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
        <div @click="bind">去绑卡</div>
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
            this.iccid19 = res.code
        })
    },
    bind: function() {
        // window.location.href = 'alipays://platformapi/startapp?appId=20000042&publicBizType=LIFE_APP&publicId=2021002105630076'
        if (this.iccid19 === null || this.iccid19 === '' || this.iccid19.length !== 19) {
            this.$toast('请输入19位iccid')
            return
        }
        if (this.cardName === null || this.cardName === '' || this.cardName.length > 10) {
            this.$toast('卡名称不能超过10个字')
            return
        }
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
                    this.toCards()
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
    toCards: function(iccid) {
        this.$router.push({
            path: '/aliy/cards'
        })
    }
  }
}
</script>
<style lang="less" scoped>
.page{
    font-size: 16px;
}
.card{
    margin:50px;
    width: 5.8rem;
    height: 4.3rem;
    display:block;
    background:url(../../common/images/card-demo.png) no-repeat 100% 100%;
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
</style>
