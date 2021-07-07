<template>
  <div class="list">
    <p class="name">学生姓名</p>
    <div class="value">
      <span>{{ invoiceInformation.name }}{{invoiceInformation.phone}}</span>
      <div mini plain type="primary" class="copy_btn" id="companyName" :data-clipboard-text="invoiceInformation.name" @click="copyFn('#companyName', '学生姓名')">复制</div>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
export default {
  data () {
    return {
      invoiceInformation: {
        name: '测试',
        phone: '13161483868'
      }
    }
  },
  methods: {
    copyFn (id, title) {
      const clipboard = new Clipboard(id)
      const _this = this
      this.$nextTick(() => {
        clipboard.on('success', function (e) {
          _this.$toast(title + '已复制')
          clipboard.destroy()
        })
        clipboard.on('error', function (e) {
          // console.log('不支持复制功能哦！')
          clipboard.destroy()
        })
      })
    }
  }
}
</script>
