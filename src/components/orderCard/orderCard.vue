<template>
  <!-- 我的记录 -->
  <div class="orderCard_info">
    <!-- <v-header :headerName="headerName"></v-header> -->

    <div class="switchXuebakaBox" v-show="isShowAll">
      <van-icon name="arrow-left" @click="onClick_next(0)" :color="bodyColor" :size="iconSize" />
      <div class="switchXuebakalist">
        <div v-for="item in cardList" :key="item.cardNo" class="switchXuebakaItem " :class="[currCard.cardNo == item.cardNo?'switchActive':'']">
          <div @click="onClick_selectCard(item)">
            <div class="name">{{item.studentName}}</div>
            <div class="phone">{{item.cardNo}}</div>
          </div>
        </div>
      </div>
      <van-icon name="arrow" @click="onClick_next(1)" :color="bodyColor" :size="iconSize" />
    </div>
    <!-- time list -->
    <div class="tiem-list-box" v-show="isShowAll">
      <div class="time-item" :class="[selectDate.mon==item.mon&&selectDate.year==item.year?'time-active':'']" v-for="(item,index) of MonthList" :key="index">
        <div class="timeFlex" @click="onClick_selectDate(item)">
          <span>{{item.mon}}月</span>
          <span>{{item.year}}</span>
        </div>

      </div>
    </div>

    <!-- list -->
    <div class="box-card" v-show="isShowAll">
      <div class="order-list" @click="onClick_goPage('monthbill')">
        <van-icon class="orderList-icon-l" name="notes-o" />
        <span class="orderListTitle">月账单</span>
        <van-icon class="orderList-icon-r" name="arrow" :color="bodyColor" />
      </div>
      <div class="order-list" @click="onClick_goPage('monthbilldtl')">
        <van-icon class="orderList-icon-l" name="balance-list-o" />
        <span class="orderListTitle">月详情</span>
        <van-icon class="orderList-icon-r" name="arrow" :color="bodyColor" />
      </div>
      <div class="order-list" @click="onClick_goPage('rechargeList')">
        <van-icon class="orderList-icon-l" name="gold-coin-o" />
        <span class="orderListTitle">充值扣费</span>
        <van-icon class="orderList-icon-r" name="arrow" :color="bodyColor" />
      </div>
      <div class="order-list" @click="onClick_goPage('cardOrderList')">
        <van-icon class="orderList-icon-l" name="exchange" />
        <span class="orderListTitle">卡订购&套餐变更</span>
        <van-icon class="orderList-icon-r" name="arrow" :color="bodyColor" />
      </div>
    </div>

    <div class="see-order">
      <router-link to="seeOrder">查看所有卡订购信息</router-link>
    </div>
    <div v-show="!isShowAll" style="text-align: center;height:100%;margin-top: 3rem;font-size: .4rem;line-height: .6rem">
      <div>您当前暂无学霸卡,</div>
      <div>
        现在去<span style="color: rgb(255, 186, 40)" @click="onClick_goPage2('applyCard')">申请</span>或<span style="color: rgb(255, 186, 40);" @click="onClick_goPage2('activation')">激活</span>。
      </div>
    </div>
    <div v-show="loadingShow" class="loading">
      <van-loading type="spinner" color="#FDAB16" />
    </div>
  </div>
</template>

<script>
// import vHeader from '../header.vue'

export default {
  data () {
    return {
      loadingShow: false,
      cardList: [],
      MonthList: [],
      selectDate: {
        year: '0',
        mon: '0'
      },
      currCard: {},
      // headerName: '我的记录',
      bodyColor: '#FDAB16',
      iconSize: '20',
      currChild: {},
      isShowAll: true
    }
  },
  components: {
    // vHeader
  },
  created () {
    this.getCardList()
    this.currChild = JSON.parse(sessionStorage.getItem('currChild'))
    this.getMonthList()
  },
  mounted() {
    history.pushState(null, null, document.URL)
    window.addEventListener('popstate', function () {
      history.pushState(null, null, document.URL)
    })
  },
  methods: {
    // 获取卡列表数据
    getCardList () {
      this.loadingShow = true
      this.$axios({
        method: 'GET',
        url: 'wechat/v1.0/users/cards'
      }).then(res => {
        if (res.data.resultCode === 0) {
          this.cardList = res.data.data
          // console.log(this.cardList)
          if (this.cardList.length === 0) {
            this.isShowAll = false
          } else {
            this.isShowAll = true
          }
          if (sessionStorage.getItem('orderCurrCard')) {
            this.currCard = JSON.parse(sessionStorage.getItem('orderCurrCard'))
          } else {
            this.currCard = this.cardList[0]
          }
          this.loadingShow = false
        } else {
          this.$toast('加载失败')
          this.loadingShow = false
        }
      })
    },
    // 点击列表
    onClick_selectCard ($item) {
      // console.log($item)
      this.currCard = $item
      sessionStorage.setItem('orderCurrCard', JSON.stringify($item))
      this.$forceUpdate()
    },
    onClick_next ($type) {
      if ($type === '0') {
        this.headGroup = this.headGroup - 3
        this.currCard = this.cardList[this.headGroup]
        sessionStorage.setItem('orderCurrCard', JSON.stringify(this.currCard))
        sessionStorage.setItem('orderHeadGroup', JSON.stringify(this.headGroup))
      } else {
        this.headGroup = this.headGroup + 3
        this.currCard = this.cardList[this.headGroup]
        sessionStorage.setItem('orderCurrCard', JSON.stringify(this.currCard))
        sessionStorage.setItem('orderHeadGroup', JSON.stringify(this.headGroup))
      }
    },
    // 获取日期
    getMonthList () {
      var data = new Date()
      var year = data.getFullYear()
      var mon = data.getMonth() + 2
      for (var i = 0; i < 6; i++) {
        mon--
        if (mon <= 0) {
          year = year - 1
          mon = mon + 12
        }
        if (mon < 10) {
          mon = '0' + mon
        }
        if (i === 0) {
          if (sessionStorage.getItem('currDate')) {
            this.selectDate = JSON.parse(sessionStorage.getItem('currDate'))
          } else {
            this.selectDate = {
              year: year,
              mon: mon
            }
          }
        }
        this.MonthList.push({
          year: year,
          mon: mon
        })
      }
    },
    // 点击日期
    onClick_selectDate ($item) {
      this.selectDate = $item
      sessionStorage.setItem('currDate', JSON.stringify($item))
    },
    onClick_goPage ($router, $type) {
      const date = '' + this.selectDate.year + '' + this.selectDate.mon
      var currChid = {
        iccid: this.currCard.iccid,
        studentName: this.currCard.studentName,
        iconUrl: this.currCard.iconUrl,
        cardNo: this.currCard.cardNo,
        date: date
      }

      sessionStorage.setItem('currChild', '')
      sessionStorage.setItem('currChild', JSON.stringify(currChid))
      // alert(this.currCard.cardNo)
      this.$router.push({
        path: '/' + $router,
        query: {
          token: window.token,
          cardNo: this.currCard.cardNo,
          date: this.selectDate.year + this.selectDate.mon,
          type: $type
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
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../../common/css/orderCard.less);
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
