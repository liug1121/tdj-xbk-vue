<template>
  <div>
    <!-- <v-header :headerName="headerName"></v-header> -->
    <van-field v-model="studentName" center placeholder="请输入学生姓名">
      <template #button>
        <van-button size="small" :color="bodyColor" type="primary" @click="addClick">确定</van-button>
      </template>
    </van-field>
  </div>
</template>

<script>
// import vHeader from '../header.vue'
import API from 'api/setting'
export default {
  data () {
    return {
      // headerName: '设置学生姓名',
      studentName: this.$route.query.studentName,
      bodyColor: '#FDAB16'
    }
  },
  components: {
    // vHeader
  },
  created () { },
  methods: {
    addClick () {
      const config = {
        cardNo: this.$route.query.cardNo,
        iconUrl: this.$route.query.iconUrl,
        userName: this.studentName
      }
      API.apiStudentName(config).then(res => {
        if (res.resultCode === 0) {
          this.$toast('修改成功')
          this.$router.push({
            path: '/setting'
          })
        } else {
          this.$toast(res.resultInfo)
        }
      })
    }
  }
}
</script>
