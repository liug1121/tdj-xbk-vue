<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item name="personnel" to="personnel">人员管理</van-tabbar-item>
      <van-tabbar-item name="controlledGroup" to="controlledGroup" v-show="administratorsType == 1">受控组管理</van-tabbar-item>
      <van-tabbar-item name="controlledStrategy" to="controlledStrategy" v-show="administratorsType ==1">受控策略管理</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: localStorage.getItem('tabbarActive'),
      administratorsType: null
    }
  },
  created () {
    const tabbarActive = localStorage.getItem('tabbarActive')
    this.administratorsType = localStorage.getItem('administratorsType')
    if (tabbarActive === '' || tabbarActive === null || this.administratorsType === 0) {
      this.active = 'personnel'
      localStorage.setItem('tabbarActive', this.active)
    }
  },
  methods: {
    onChange (index) {
      localStorage.setItem('tabbarActive', index)
      this.active = localStorage.getItem('tabbarActive')
    }
  }
}
</script>

<style lang="less" scoped>
.van-tabbar {
  background: #d7d7d7;
  height: 40px;
  line-height: 40px;
}
.van-tabbar-item--active {
  color: #fff;
  background: #ffb525;
}
.van-tabbar-item {
  border-right: 1px solid #fff;
  font-size: 14px;
}
.van-tabbar-item:last-child {
  border-right: 0;
}
</style>
