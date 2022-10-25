<template>
  <div class="page">
    <div class="process">
        <table>
            <tr>
                <td class="mask"><img  src="../../common/images/process-sim.jpg" /><div>添加卡</div></td>
                <td ><img  src="../../common/images/process-cert.jpg" /><div>实名认证</div></td>
            </tr>
        </table>
    </div>
    <div class="title">中国电信物联网H5实名登记方法</div>
    <div class="item">
        <!-- <div> 1、</div> -->
        <div class="first">您可以通过中国电信的官方物联网H5实名登记网页，完成实名认证：</div>
        <div class="step-title">步骤1：</div>
        <div>
            <div>进入“中国电信物联’H5实名登记”页面</div>
            <div>1.1  在第一行输入ICCID；</div>
            <div>1.2  第二行输入自己的手机号；</div>
            <div>1.3  点击“获取验证码”，填入收到的验证码；</div>
            <div>1.4  然后点击“快速验证”。</div>
        </div>
        <img class="image-demo" src="../../common/images/cert-demo-ct.png" />
    </div>
    <div class="item">
        <div class="step-title">步骤2:</div>
        <div>电信物联网实名登记需要的ICCID，可先复制出来：{{iccid}}<span class="to-copy" v-clipboard:copy="iccid" v-clipboard:success="onCopy" v-clipboard:error="onError">点击复制</span></div>
    </div>
    <div class="item">
        <div class="step-title">步骤3:</div>
        <div>步骤3:按照指引上传身份证正反面，进行人脸识别认证，完成实名认证后，关闭“中国电信物联网实名登记”页面，稍加等待即可完成开卡流程。</div>
    </div>
    <!-- <div class="tocert"><a href="https://ur.alipay.com/xVMGSNb4VYgFWollT2kzM">开始实名认证</a></div> -->
    <div class="tocert" @click="toCert">开始实名认证</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      iccid: '',
      certUrl: 'http://uniteapp.ctwing.cn:9090/uapp/certifhtml/certif_entry.html?userCode=r/s9Tc00hjiKcR13MIjZHg==&passWord=9u8VuY1xbez6r6k/BBnLlw==&tmstemp=1666658072758'
    }
  },
  created() {
    this.iccid = this.$route.query.iccid
  },
  methods: {
    toCert: function() {
      var certUrl = this.certUrl + this.iccid
      window.open(certUrl, '_blank')
    },
    onCopy: function() {
      this.$toast('ICCID已复制到剪切板！')
    },
    onError: function() {
      this.$toast('抱歉，复制失败！')
    }
  }
}
</script>
<style lang="less" scoped>
.page{
    font-size: 16px;
}
.title{
    font-size: 25px;
    text-align: center;
    margin-top: 20px;
}
.item{
    margin: 20px;
}
.tocert{
    text-align: center;
    border: 1px solid #f59a23;
    border-radius:15px;
    margin-top: 10px;
    padding-top: 10px;
    padding-bottom: 15px;
    // margin-bottom: 50px;
    width: 60%;
    margin-left: 20%;
    background: #fa7000;
    color: white;
}
.tocert a{
  color: white;
  font-size: 18px;
}
.image-demo{
    width: 80%;
    height: 200px;
    margin-left: 10%;
    margin-top: 20px;
}
.first{
  margin-bottom: 30px;
}
.to-copy{
  // background: #fa7000;
  border: 1px solid #fa7000;
  color: #fa7000;
  // margin-left: 5px;
  // margin-right: 5px;
  margin: 10px;
  font-size: 14px;
  padding: 2px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius:5px;
}
.step-title{
  font-weight:bold;
}
.process{
    width: 98%;
    margin-left: 1%;
    margin-top: 1px;
    height: 100px;
    // background: gray;
    margin-bottom: 10px;
    border: 0.5px solid #fa7000;
    border-radius:5px;
}
.process img{
    width: 30px;
    height: 30px;
}
.process table{
    width: 90%;
    margin-left: 5%;
    margin-top: 20px;
    // background: gray;
    text-align: center;
    color: #fa7000;
    font-size: 14px;
}
.mask {
 opacity: 0.30;
 z-index: 1
}
</style>
