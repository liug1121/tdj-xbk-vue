<template>
  <div class="">
    <van-field readonly clickable :value="dateValueChild" label="" :placeholder="dataLabel" @click="showPickerDate = true" label-width="70px" required />
    <van-popup v-model="showPickerDate" position="bottom">
      <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" @confirm="onConfirmDate" @cancel="showPickerDate = false" />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'QKdatetime',
  props: {
    dateValue: {
      // type: String,
      required: true
    },
    dataLabel: {
      type: String,
      required: true
    },
    straegyId: {
      type: Number
    }
  },
  data () {
    return {
      showPickerDate: false,
      dateValueChild: this.dateValue,
      straegyIdChild: this.straegyId,
      currentDate: new Date()
    }
  },
  methods: {
    onConfirmDate (time) {
      this.dateValueChild = `${this.handleTime(time)} ${'00'}:${'00'}:${'00'}`
      this.$emit('changeDate', this.dateValueChild, this.straegyIdChild)
      this.showPickerDate = false
    },
    // 时间处理 Wed Aug 21 2019 10:00:58 GMT+0800 (中国标准时间) 2020-08-03 15:15:15
    handleTime ($data) {
      const y = $data.getFullYear()
      const m = ($data.getMonth() + 1 + '').padStart(2, '0')
      const d = ($data.getDate() + '').padStart(2, '0')
      return `${y}-${m}-${d}`
    }
  }
}
</script>
<style lang="less" scoped>
</style>
