<template>
  <div class="page">
    <div class="title">联通实名认证方法</div>
    <div class="item">
        <!-- <div> 1、</div> -->
        <div>1、微信登录并允许小程序获取您的昵称、头像等信息，点击右上方“实名认证”按钮，按照指引上传身份证正反面，进行人脸识别认证。</div>
        <img class="image-demo" src="../../common/images/union-cert-demo.jpg" />
    </div>
    <div class="item">
        <!-- <div>2、</div> -->
        <div>2、小程序中需要输入的卡号即ICCID，可先复制出来 </div>
    </div>
    <div class="item">
        <!-- <div>3、</div> -->
        <div>3、完成实名认证后，关闭“物联网服务运营平台小程序”，稍加等待即可完成开卡流程。</div>
    </div>
    <div class="tocert">去联通实名认证</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.page{
    font-size: 18px;
}
.title{

    font-size: 30px;
    text-align: center;
    margin-top: 60px;
}
.item{
    margin: 20px;
}
.tocert{
    text-align: center;
    border: 1px solid #f59a23;
    border-radius:15px;
    margin-top: 60px;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 50px;
    width: 80%;
    margin-left: 10%;
    background: #f59a23;
    color: white;
}
.image-demo{
    width: 200px;
    height: 120px;
    margin-left: 30%;
}
</style>
