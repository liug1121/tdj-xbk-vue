<template>
  <div>
    <!-- <v-header :headerName="headerName"></v-header> -->
    <div class="header">
      <div>起始时间</div>
      <div>用量</div>
      <div>时长</div>
    </div>
    <div style="width: 100%;height: 1rem">
    </div>
    <ul v-infinite-scroll="voiceLoadMore" infinite-scroll-disabled="voliceLoading" infinite-scroll-immediate-check="false" infinite-scroll-distance="10">
      <li v-for="(item,index) of voiceData" :key="index" class="item">
        <div class="header1">
          <div>{{item.startTime}}</div>
          <div>{{item.usage}}MB</div>
          <div>{{item.duration}}</div>
        </div>
      </li>

      <li class="more_loading">
        <van-loading class="loading" type="spinner" :color="bodyColor" v-show="voiceLoading" />
        <div v-show="voiceLoadAll" style="text-align: center;line-height: .8rem">已全部加载</div>
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
// import vHeader from '../header.vue'
export default {
  created () {
    this.currChild = JSON.parse(sessionStorage.getItem('currChild'))
    document.title = '上网流量日详单(' + this.currChild.date + ')'

    this.getVoiceData()
  },
  data () {
    return {
      // headerName: '上网流量日详单',
      currChild: {},
      bodyColor: '#FDAB16',
      voiceCurrPage: 1,
      voiceLoading: false,
      voiceLoadAll: false,
      voiceData: [],
      total: 0
    }
  },
  components: {
    // vHeader
  },
  methods: {
    getVoiceData ($page) {
      this.$axios({
        method: 'POST',
        url: 'wechat/v1.0/users/billings/details/networks/dayusage',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          // cardNo: this.currChild.cardNo,
          // date: this.currChild.date,
          netDetailId: this.$route.query.netDetailId,
          page: 0,
          pageSize: 10
        })
      }).then(res => {
        this.voiceData = res.data.data
        if (this.voiceData.length) {
          this.voiceLoading = false
          this.voiceLoadAll = true
        }
      }).catch((error) => {
        this.$toast(error.resultInfo)
      })
    },

    voiceLoadMore () {
      this.voiceLoading = true
      if (this.voiceData.length === this.total) {
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
.item {
  width: 100%;
  padding-left: 0.3rem;
  height: 1rem;
  border-bottom: 1px solid #cccccc;
  font-size: 0.25rem;
  .right-btn {
    float: right;
    font-size: 0.5rem;
    margin-top: 0.1rem;
    width: 7%;
    color: #ffba26;
  }
  .left {
    width: 43%;
    height: 100%;
    float: left;
    .phone {
      margin-left: 0.3rem;
      img {
        width: 0.3rem;
        margin-left: 0.2rem;
      }
    }
  }
  .right {
    float: left;
    width: 49%;
    .time_length {
      text-align: right;
      width: 100%;
      height: 0.42rem;
    }
    .time {
      text-align: right;
      width: 100%;
      height: 0.3rem;
    }
  }
}

.more_loading {
  height: 1rem;
  font-size: 12px;
}

.header {
  width: 100%;
  height: 1rem;
  border-bottom: 1px solid #ccc;
  position: fixed;
  background: #fff;
  div {
    width: 33%;
    float: left;
    text-align: center;
    line-height: 1rem;
    font-weight: 600;
    font-size: 0.3rem;
    color: #ffba26;
  }
}

.header1 {
  width: 100%;
  height: 1rem;
  border-bottom: 1px solid #ccc;
  div {
    width: 33%;
    float: left;
    text-align: center;
    line-height: 1rem;
  }
}
</style>
