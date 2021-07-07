<template>
  <div class="">
    <van-field readonly clickable name="datetimePicker" :value="timeValueChild" :label="timeLabel" placeholder="选择时间" @click="showPickerTime = true" label-width="70px" />
    <van-popup v-model="showPickerTime" position="bottom">
      <van-datetime-picker type="time" @confirm="onConfirmTime" @cancel="showPickerTime = false" />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'QKdatetime',
  props: {
    timeValue: {
      // type: String,
      required: true
    },
    timeLabel: {
      type: String,
      required: true
    },
    straegyId: {
      type: Number
    },
    straegyDetailsId: {
      type: Number
    }
  },
  data () {
    return {
      showPickerTime: false,
      timeValueChild: this.timeValue,
      straegyIdChild: this.straegyId,
      straegyDetailsIdChild: this.straegyDetailsId
    }
  },
  methods: {
    onConfirmTime (time) {
      this.timeValueChild = time + ':' + '00'
      this.showPickerTime = false
      this.id = this.straegyIdChild
      this.detailId = this.straegyDetailsIdChild
      this.$emit('changeTime', this.timeValueChild, this.id, this.detailId)
    }
  }
}
</script>
<style lang="less" scoped>
</style>
