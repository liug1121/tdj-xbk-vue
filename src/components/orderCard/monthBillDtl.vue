<template>
  <div>
    <!-- <v-header :headerName="headerName"></v-header> -->
    <van-tabs v-model="headType" swipeable line-width="20%" :color="bodyColor" title-active-color="#E4C951" @tab-click="handleClick">
      <van-tab name="first">
        <template slot="title">
          <van-icon name="phone-o" class="vertical_align" />
          语音通话
        </template>
        <div class="XQList" v-infinite-scroll="voiceLoadMore" infinite-scroll-disabled="voiceLoading" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
          <div class="XQitem" v-for="(item,index) in voiceData" :key="index">
            <div class="XQitemLeft">
              <div v-show="item.voiceType==0" class="phone">{{item.targetCardNo}} <img src="./../../common/images/huru.png" alt=""></div>
              <div v-show="item.voiceType==1" class="phone">{{item.targetCardNo}} <img src="./../../common/images/huchu.png" alt=""></div>
            </div>
            <div class="XQitemRight">
              <div class="timeLength">{{item.duration}}</div>
              <div class="time">{{item.time}}</div>
            </div>
          </div>
          <div class="moreLoading">
            <van-loading class="loading" type="spinner" :color="bodyColor" v-show="voiceLoading" />
            <div v-show="voiceLoadAll" style="text-align: center;line-height: .8rem">已全部加载</div>
          </div>
        </div>
      </van-tab>
      <van-tab title="短信" name="second">
        <template slot="title">
          <van-icon name="envelop-o" class="vertical_align" />
          短信
        </template>
        <div class="XQList" v-infinite-scroll="smsLoadMore" infinite-scroll-disabled="smsLoading" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
          <div class="XQitem" v-for="(item,index) in smsData" :key="index">
            <div class="XQitemLeft">
              <div v-show="item.smsType==1" class="phone">{{item.targetCardNo}} <img src="./../../common/images/fa.png" alt=""></div>
              <div v-show="item.smsType==0" class="phone">{{item.targetCardNo}} <img src="./../../common/images/shou.png" alt=""></div>
            </div>
            <div class="XQitemRight">
              <div class="time">{{item.time}}</div>
            </div>
          </div>
          <div class="moreLoading">
            <van-loading class="loading" type="spinner" :color="bodyColor" v-show="smsLoading" />
            <div v-show="smsLoadAll" style="text-align: center;line-height: .8rem">已全部加载</div>
          </div>
        </div>
      </van-tab>
      <van-tab name="third">
        <template slot="title">
          <van-icon name="envelop-o" class="vertical_align" />
          上网流量
        </template>
        <div class="XQList" v-infinite-scroll="flowLoadMore" infinite-scroll-disabled="flowLoading" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
          <div class="XQitem" v-for="(item,index) in flowData" :key="index" @click="onClick_flowDtl(item)">
            <div class="XQitemLeft">
              <div class="phone">{{item.date}}</div>
            </div>
            <div class="XQitemRight">
              <div class="timeLength">日总时长：{{item.dayDuration}}</div>
              <div class="time">日总流量：{{item.dayUsage}}MB</div>
            </div>
            <van-icon name="arrow" class="XQitemIcon" />
          </div>
          <div class="moreLoading">
            <van-loading class="loading" type="spinner" :color="bodyColor" v-show="flowLoading" />
            <div v-show="flowLoadAll" style="text-align: center;line-height: .8rem">已全部加载</div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script type="text/ecmascript-6">
// import vHeader from '../header.vue'
export default {
  created () {
    // if (sessionStorage.getItem('monthbilldtlHead')) {
    //   this.headType = sessionStorage.getItem('monthbilldtlHead')
    //   sessionStorage.removeItem('monthbilldtlHead')
    // }
    this.currChild = JSON.parse(sessionStorage.getItem('currChild'))
    document.title = '月详单(' + this.currChild.date + ')'

    this.getVoiceData()
    this.getSmsData()
    this.getFlowData()
  },
  data () {
    return {
      // headerName: '月详情',
      headType: 'first',
      bodyColor: '#FDAB16',
      currChild: {},

      voiceCurrPage: 1,
      voiceLoading: false,
      voiceLoadAll: false,
      voiceData: [],

      smsCurrPage: 1,
      smsLoading: false,
      smsLoadAll: false,
      smsData: [],

      flowCurrPage: 1,
      flowLoading: false,
      flowLoadAll: false,
      flowData: []

    }
  },
  components: {
    // vHeader
  },
  methods: {
    handleClick ($data) {
      this.headType = $data.name
    },

    onClick_flowDtl ($obj) {
      sessionStorage.setItem('monthbilldtlHead', this.headType)
      this.$router.push({
        path: '/flowday',
        query: {
          date: $obj.cycleId,
          cardNo: this.$route.query.cardNo,
          netDetailId: $obj.id
        }
      })
    },
    // 获取语音
    getVoiceData ($page, $fun) {
      // console.log(this.currChild.date)
      this.$axios({
        method: 'POST',
        url: 'wechat/v1.0/users/billings/details/voice',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          cardNo: this.currChild.cardNo,
          date: this.currChild.date,
          page: 0,
          pageSize: 100
        })
      }).then(res => {
        if (res.data.resultCode === 0) {
          this.voiceData = res.data.data.billingDetails
          // console.log(this.voiceData)
          if (this.voiceData.length === 0) {
            this.voiceLoading = false
            this.voiceLoadAll = true
          }
        } else {
          this.$toast(res.data.resultInfo)
        }
      })
    },
    // 获取短信
    getSmsData ($page, $fun) {
      // console.log($page)
      this.$axios({
        method: 'POST',
        url: 'wechat/v1.0/users/billings/details/sms',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          cardNo: this.currChild.cardNo,
          date: this.currChild.date,
          page: 0,
          pageSize: 100
        })
      }).then(res => {
        if (res.data.resultCode === 0) {
          this.smsData = res.data.data.billingDetails
          // console.log(this.smsData)
          if (this.smsData.length === 0) {
            this.smsLoading = false
            this.smsLoadAll = true
          }
        } else {
          this.$toast(res.data.resultInfo)
        }
      })
    },
    // 获取流量
    getFlowData ($page, $fun) {
      // console.log($page)
      this.$axios({
        method: 'POST',
        url: 'wechat/v1.0/users/billings/details/networks',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          cardNo: this.currChild.cardNo,
          date: this.currChild.date,
          page: 0,
          // page: 1,
          pageSize: 100
        })
      }).then(res => {
        if (res.data.resultCode === 0) {
          this.flowData = res.data.data.billingDetails
          // console.log(this.flowData)
          if (this.flowData.length === 0) {
            this.flowLoading = false
            this.flowLoadAll = true
          }
        } else {
          this.$toast(res.data.resultInfo)
        }
      })
    },

    flowLoadMore () {
      this.flowLoading = true
      if (this.flowData.length) {
        this.flowLoading = false
        this.flowLoadAll = true
      } else {
        this.getFlowData(this.flowCurrPage, () => {
          this.flowLoading = false
          this.flowCurrPage++
        })
      }
    },

    smsLoadMore () {
      this.smsLoading = true
      if (this.smsData.length) {
        this.smsLoading = false
        this.smsLoadAll = true
      } else {
        this.getSmsData(this.smsCurrPage, () => {
          this.smsLoading = false
          this.smsCurrPage++
        })
      }
    },
    voiceLoadMore () {
      this.voiceLoading = true
      if (this.voiceData.length) {
        this.voiceLoading = false
        this.voiceLoadAll = true
      } else {
        this.getVoiceData(this.voiceCurrPage, () => {
          this.voiceLoading = false
          this.voiceCurrPage++
        })
      }
    }
  }
}

</script>
<style type="text/css" lang="less" scoped>
.XQList {
  background: #fff;
  font-size: 14px;
  padding: 0 15px;
  .XQitem {
    display: flex;
    height: 1rem;
    line-height: 25px;
    border-bottom: 1px solid #eee;
    justify-content: center;
    align-items: center;
    .XQitemLeft {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .phone {
        flex: 1;
        img {
          width: 0.3rem;
          margin-left: 0.2rem;
          vertical-align: middle;
        }
      }
    }
    .XQitemRight {
      .timeLength {
        text-align: right;
      }
      .time {
        text-align: right;
      }
    }
    .XQitemIcon {
      padding-left: 10px;
      color: #fdab16;
    }
  }
  .moreLoading {
    height: 1rem;
  }
}
</style>
