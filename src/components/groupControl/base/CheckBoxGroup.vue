<template>
  <div ref="checkBigBox" class="checkboxGroup">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'CheckBoxGroup',
  props: {
    value: {
      type: Array
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  mounted () {
    /**
          * 多选组时，初始化如果有默认选中项则获取对应的value值
         */
    const childItem = this.$children
    const childArr = []
    childItem.map(child => {
      if (child.checked) {
        childArr.push(child.val + '')
      }
    })
    this.$emit('change', [...childArr])
  },
  methods: {
    /**
          * checkbox选中状态时，增加值方法
          * 参数说明：
          * @param {String} item 选中增加项的值
         */
    addCheck (item) {
      const { value } = this
      this.$emit('change', [...value, item])
    },
    /**
          * checkbox取消选中状态时，减少值方法
          * 参数说明：
          * @param {String} item 取消选中项的值
         */
    delCheck (item) {
      const { value } = this
      this.$emit('change', value.filter(val => val !== item))
    }
  }
}
</script>
<style lang="less" scoped>
.checkboxGroup {
  display: flex;
  flex-wrap: wrap;
}
</style>
