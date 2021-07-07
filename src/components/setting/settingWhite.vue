<template>
  <!-- 设置 -->
  <div class="activate_content">
    <!-- <v-header :headerName="headerName"></v-header> -->
    <div class="box-card">
      <div class="settingList">
        <div class="settingTitle">手机号</div>
        <div class="settingContent">{{cardNo}}</div>
      </div>
      <div class="settingList">
        <div class="settingTitle">学生姓名</div>
        <div class="settingContent">{{studentName}}</div>
      </div>
      <div class="settingList" @click="onClickEdit('whiteEdit')">
        <div class="settingTitle">呼出的白名单设置</div>
        <div class="settingContent"></div>
        <van-icon class="settingIcon" name="arrow" :color="bodyColor" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // headerName: '设置',
      bodyColor: '#FDAB16',
      cardNo: '',
      studentName: ''
    }
  },
  components: {
    // vHeader
  },
  mounted () {
    this.cardNo = JSON.parse(sessionStorage.getItem('cardNo'))
    this.studentName = JSON.parse(sessionStorage.getItem('studentName'))
  },
  methods: {
    onClickEdit ($router) {
      this.$router.push({
        path: '/' + $router,
        query: {
          cardNo: this.cardNo,
          fwAcccount: JSON.parse(sessionStorage.getItem('fwAcccount'))
        }
      })
    }
  }
  // deactivated () {
  //   sessionStorage.clear('currCard')
  // }
}
</script>

<style lang="less" scoped>
@import url(../../common/css/setting.less);
.settingList:first-child {
  height: 1rem !important;
}
</style>
