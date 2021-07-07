<template>
  <div>
    <v-header :headerName="headerName"></v-header>
    <!-- logo -->
    <div class="use-header">
      <div class="use-h-left">
        <div class="use-name">超级学霸卡</div>
        <div class="use-wxh">微信号：gh_f2f1b606600</div>
      </div>
      <img :src="xbkLogo" alt="">
    </div>
    <!-- 二维码 -->
    <div class="userCard-content">
      <p>超级学霸卡-可管控的手机卡 学霸盒子-管理家庭网络 学霸手机-管理手机应用...</p>
      <img :src="imageUrls" alt="超级学霸卡公众号">
      <p>长按 <span class="font-weight">识别二维码</span> 关注 <span class="font-color">“超级学霸卡”</span> 公众号</p>
    </div>
  </div>
</template>

<script>
import imageUrls from 'common/images/xuebaka.png'
import xbkLogo from 'common/images/xbk_logo.png'
import VHeader from './../header'
export default {
  data () {
    return {
      imageUrls: imageUrls,
      xbkLogo: xbkLogo,
      headerName: '立即使用'
    }
  },
  components: {
    VHeader
  }
}
</script>

<style lang="less" scoped>
.use-header {
  display: flex;
  font-size: 14px;
  align-items: center;
  margin: 0.4rem 0.72rem;
  border-bottom: 1px solid #ebedf0;
  padding-bottom: 20px;
  .use-h-left {
    flex: 1;
    .use-name {
      font-size: 20px;
      line-height: 30px;
    }
    .use-wxh {
      color: #8d8d8d;
    }
  }
  img {
    width: 60px;
    height: 60px;
    margin-left: 10px;
  }
}
.userCard-content {
  font-size: 16px;
  text-align: center;
  padding: 1rem 0.72rem;
  img {
    margin: 40px 0;
    width: 200px;
  }
  .font-weight {
    font-weight: bold;
  }
  .font-color {
    color: #ec7020;
  }
}
</style>
