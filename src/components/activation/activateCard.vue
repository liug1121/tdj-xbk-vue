<template>
  <!-- 开卡 -->
  <div class="activateCard_info">
    <!-- <v-header :headerName="headerName"></v-header> -->
    <div class="certification">
      <img src="../../common/images/certification-logo.png" alt="">
    </div>
    <div class="certificationText">
      <div class="textLarge">长按二维码，进入联通官方小程序，进行实名认证,若已完成实名认证，请耐心等待系统处理！</div>
      <div class="textSmall">
        <p>认证成功后，在小程序内，添加本卡ICCID，</p>
        <p>完成重新进入<span class="red">超级学霸卡公众号 - 学霸卡管理</span></p>
      </div>
    </div>
  </div>
</template>

<script>
// import vHeader from '../header.vue'
export default {
  data () {
    return {
      // headerName: '验证'
    }
  },
  components: {
    // vHeader
  }
}
</script>

<style lang="less" scoped>
.activateCard_info {
  width: 100%;
  height: 100%;
  position: relative;
  .certification {
    margin: 0.4rem 2rem;
    img {
      width: 100%;
    }
  }
  .certificationText {
    margin: 10px;
    .textLarge {
      font-size: 0.32rem;
      line-height: 0.8rem;
    }
    .textSmall {
      font-size: 0.28rem;
      line-height: 0.48rem;
      .red {
        color: red;
      }
    }
  }
}
</style>
