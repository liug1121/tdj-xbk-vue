<template>
  <div class="selectInput">
    <div class="title">
      <input type="text" placeholder="请选择.." v-model="selectCon" @click.stop="liShow" />
    </div>
    <ul v-show="isShow" @click.stop="liShow">
      <li v-for="item in StragegysListOption" :key="item.id">
        <label :id="item.id">
          <input type="checkbox" v-model="item.Check" />
          {{item.name}}
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      checkedData: [], // 选中的数据
      isShow: false, // 下拉列表是否显示
      selectCon: '' // 选中的内容
    }
  },
  props: ['StragegysListOption'],
  watch: {
    StragegysListOption: {
      handler (newVal, oldVal) {
        // 选中数据
        this.checkedData = newVal.filter(function (item) {
          return item.Check === true
        })
        // console.log(this.checkedData)
        // 在页面打印出的数据
        this.selectCon = '' // 点击的当前项的展示
        for (var i = 0; i < this.checkedData.length; i++) {
          this.selectCon += this.checkedData[i].name + '  '
        }
        this.stragegyIds = this.checkedData.map(function (item) {
          return item.id
        })
        // 给父组件传值
        this.$emit('change', this.stragegyIds)
      },
      deep: true
    }
  },
  mounted () {
    const that = this
    // 点击页面空白处隐藏下拉列表
    document.addEventListener('click', function () {
      that.isShow = false
    })
  },
  methods: {
    // 控制下拉列表的显示隐藏
    liShow () {
      this.isShow = true
    }
  }
}
</script>

<style lang="less" scoped>
.selectInput .title {
  width: 100%;
  position: relative;
}
.selectInput input[type='text'] {
  width: 100%;
  height: 40px;
  padding: 0 5px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 3px;
  border-radius: 3px;
  border: 1px solid #ddd;
  box-sizing: border-box;
}
.selectInput i {
  position: absolute;
  width: 30px;
  height: 40px;
  line-height: 38px;
  right: -12px;
  top: 1px;
  text-align: center;
  cursor: pointer;
}
.selectInput ul {
  border-radius: 3px;
  -moz-border-radius: 3px; /* Firefox */
  -webkit-border-radius: 3px; /* Safari 和 Chrome */
  border-radius: 3px; /* Opera 10.5+, 以及使用了IE-CSS3的IE浏览器 */
  -moz-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2); /* Firefox */
  -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2); /* Safari 和 Chrome */
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2); /* Opera 10.5+, 以及使用了IE-CSS3的IE浏览器 */
  width: auto;
  padding: 10px 30px;
  max-height: 200px;
  overflow-y: auto;
}
.selectInput li {
  line-height: 30px;
}
</style>
