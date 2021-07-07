<template>
  <div class="navCard">
    <van-icon class="nav-xbk-icon" name="cross" @click="close" />
    <span class="nav-xbk-title">{{headerName}}</span>
    <van-icon class="nav-xbk-icon" name="ellipsis" />
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: ['headerName'],
  methods: {
    close () {
      this.$router.push({
        path: '/Index'
      })
    }
  }
}
</script>
