<template>
  <!-- 设置 -->
  <div class="activate_content">
    <!-- <v-header :headerName="headerName"></v-header> -->
    <div class="box-card">
      <div class="settingList">
        <div class="settingTitle">合伙人姓名</div>
        <div class="settingContent">{{salerInfo.name}}</div>
      </div>
      <div class="settingList">
        <div class="settingTitle">联系方式</div>
        <div class="settingContent">{{salerInfo.phone}}</div>
      </div>
      <div class="settingList">
        <div class="settingTitle">地址</div>
        <div class="settingContent">{{salerInfo.address}}</div>
      </div>
      <div class="settingList">
        <div class="settingTitle">渠道</div>
        <div class="settingContent">{{salerInfo.channelName}}</div>
      </div>
    </div>
    <van-button type="info" round size="large" color="#FFBA27" style="height:42px;" >去修改</van-button>
  </div>
</template>

<script>
// import vHeader from '../header.vue'
import imageUrls from 'common/images/icon-user.png'
import API from 'api/saler'
export default {
  data () {
    return {
      salerInfo: {},
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
    this.getSalerInfo()
  },
  methods: {
    // 获取卡列表数据
    getSalerInfo () {
      API.apiGetBindSalerInfo().then(res => {
        if (res.resultCode === 0) {
            var salerInfo = res.data
            this.salerInfo = salerInfo
        //   console.log(JSON.stringify(res.data))
        } else {
          this.$toast(res.resultInfo)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../../common/css/setting.less);
</style>
