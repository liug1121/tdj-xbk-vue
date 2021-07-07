<template>
  <div>
    <div class="successBox">
      <div class="bgImg"></div>
      <div>您的申请已提交成功，我们将尽快处理！</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.successBox {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  .bgImg {
    width: 3rem;
    height: 3rem;
    margin: 0 auto;
    background: url('./../../common/images/applgSuccess.png') no-repeat;
    background-size: 100%;
  }
}
</style>
