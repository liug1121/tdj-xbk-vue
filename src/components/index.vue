<template>
  <div class="indexContent">
    <!-- <v-header :headerName="headerName"></v-header> -->
    <div class="main">
      <span>为了方便跳转页面，此页为测试用，正式项目中，不会显示</span>
      <router-link to="applyCard">申请学霸卡</router-link>
      <router-link to="activation">绑定学霸卡</router-link>
      <router-link to="administer">管理中心</router-link>
      <router-link to="consumption">用量信息</router-link>
      <router-link to="orderCard">我的记录</router-link>
      <router-link to="setting">设置</router-link>
      <router-link to="personnel">群控-人员管理</router-link>
    </div>
    <van-tabbar v-model="active">
      <van-tabbar-item name="home" icon="home-o" to="applyCard">申请</van-tabbar-item>
      <van-tabbar-item name="friends" icon="setting-o" to="activation">绑定</van-tabbar-item>
      <van-tabbar-item name="friends" icon="setting-o" to="administer">管理</van-tabbar-item>
      <van-tabbar-item name="friends" icon="setting-o" to="consumption">用量</van-tabbar-item>
      <van-tabbar-item name="friends" icon="setting-o" to="orderCard">记录</van-tabbar-item>
      <van-tabbar-item name="setting" icon="setting-o" to="setting">设置</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// import vHeader from './header.vue'
export default {
  data () {
    return {
      // headerName: '超级学霸卡',
      active: 'home'
    }
  },
  components: {
    // vHeader
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.indexContent {
  background: #fff;
  font-size: 14px;
  .main {
    padding: 15px;
    display: flex;
    flex-direction: column;
    span {
      margin-bottom: 30px;
    }
    a {
      line-height: 40px;
      color: #777;
      font-size: 16px;
    }
  }
}
</style>
