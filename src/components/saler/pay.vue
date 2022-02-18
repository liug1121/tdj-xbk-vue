<template>
  <!-- 设置 -->
  <div class="activate_content">
    <!-- <v-header :headerName="headerName"></v-header> -->
    <div class="box-card">
      <div class="settingList">
        <div class="settingTitle">iccid后7位</div>
        <div class="settingContent">8888888</div>
      </div>
      <div class="settingList">
        <div class="settingTitle">卡号</div>
        <div class="settingContent">{{currCard.cardNo}}</div>
      </div>
      <div class="settingList">
        <div class="settingTitle">卡套餐</div>
        <div class="settingContent">套餐（400元）</div>
      </div>
      <div class="settingList">
        <div class="settingTitle">支付金额</div>
        <div class="settingContent">300</div>
      </div>
    </div>
    <van-button type="info" round size="large" color="#FFBA27" style="height:42px;" >去支付</van-button>
  </div>
</template>

<script>
// import vHeader from '../header.vue'
import imageUrls from 'common/images/icon-user.png'
import API from 'api/setting'
export default {
  data () {
    return {
      // headerName: '设置',
      bodyColor: '#FDAB16',
      // 卡列表
      cardList: [],
      imageUrls,
      currCard: {},
      showCardDialog: false,
      isShowAll: true,
      showCardUnbindDialog: false
    }
  },
  components: {
    // vHeader
  },

  mounted() {
    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL)
    })
    this.getCardList()
  },
  methods: {
    // 获取卡列表数据
    getCardList () {
      API.apiCardList().then(res => {
        if (res.resultCode === 0) {
          this.cardList = res.data
          if (this.cardList.length === 0) {
            this.isShowAll = false
          } else {
            this.isShowAll = true
            this.currCard = this.cardList[0]
            sessionStorage.setItem('currCard', JSON.stringify(this.currCard))
          }
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // 点击切换学霸卡
    xbkChange () {
      this.showCardDialog = true
    },
    // 点击卡列表
    cardChange ($item) {
      sessionStorage.setItem('currCard', JSON.stringify($item))
      this.currCard = JSON.parse(sessionStorage.getItem('currCard'))
      this.showCardDialog = false
    },
    onClickEdit ($router) {
      const currCard = JSON.parse(sessionStorage.getItem('currCard'))
      var currChid = {
        cardNo: currCard.cardNo,
        iconUrl: currCard.iconUrl,
        studentName: currCard.studentName
      }

      sessionStorage.setItem('currChild', '')
      sessionStorage.setItem('currChild', JSON.stringify(currChid))

      this.$router.push({
        path: '/' + $router,
        query: {
          cardNo: currCard.cardNo,
          iconUrl: currCard.iconUrl,
          studentName: currCard.studentName,
          fwAcccount: currCard.fwAcccount
        }
      })
    },
    onClick_goPage2 ($router) {
      this.$router.push({
        path: '/' + $router,
        query: {
          token: window.token
        }
      })
    },
    // 解绑
    showCardUnbind () {
      this.showCardUnbindDialog = true
    },
    CardUnbindUnbind (action, done) {
      if (action === 'confirm') {
        const data = {
          phone: this.currCard.cardNo
        }
        API.apiCardsUnbind(data).then(res => {
          if (res.resultCode === 0) {
            this.$toast('成功解绑！')
            this.showCardUnbindDialog = false
            done()
          } else {
            this.$toast(res.resultInfo)
          }
        })
      } else if (action === 'cancel') {
        done() // 关闭
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../../common/css/setting.less);
</style>
