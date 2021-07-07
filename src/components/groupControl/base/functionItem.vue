<template>
  <!-- 功能模块 -->
  <div class="FunctionItem">
    <div class="functionItemHeader">
      <img class="functionImg" :src="functionImg" alt="">
      <div class="functionTitle">{{functionTitle}}</div>
    </div>
    <div class="functionSwitch">
      <van-switch v-model="functionSwitch1" size="16px" active-color="#7ED024" inactive-color="#fff" @change="EnabledClick" :disabled="noEdit" />
    </div>
    <div class="functionExplain">{{functionExplain}}</div>
  </div>
</template>

<script>
export default {
  props: ['functionImg', 'functionTitle', 'functionSwitch', 'functionExplain', 'noEdit'],
  data () {
    return {
      functionSwitch1: this.functionSwitch
    }
  },
  methods: {
    EnabledClick (voiceEnabled) {
      this.$emit('closepop', voiceEnabled)
    }
  }
}
</script>

<style lang="less" scoped>
.FunctionItem {
  flex: 1;
  border-right: 1px solid #ededed;
  .functionItemHeader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    .functionImg {
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      height: 20px;
    }
    .functionTitle {
      font-size: 14px;
      margin-left: 8px;
    }
  }
  .functionSwitch {
    text-align: center;
    line-height: 30px;
    .van-switch {
      vertical-align: middle;
    }
  }
  .functionExplain {
    font-size: 12px;
    text-align: center;
    line-height: 30px;
  }
}
.FunctionItem:last-child {
  border-right: 0;
}
</style>
