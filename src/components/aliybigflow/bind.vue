<template>
  <div class="page">
    <div class="card"></div>
    <div class="notice">扫描SIM卡上的ICCID条形码，开始添加，PUK码可刮开涂层后查看</div>
    <div class = "bind">
        <div>扫一扫添加</div>
    </div>
    <table>
        <tr>
            <td>
                iccid<span>*</span>
            </td>
            <td>
                <input/>
            </td>
        </tr>
        <tr>
            <td>
                卡命名：
            </td>
            <td>
                <input/>
            </td>
        </tr>
        <tr>
            <td>
                PUK码：
            </td>
            <td>
                <input/>
            </td>
        </tr>
    </table>
    <div class = "next">
        <div>下一步</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>
<style lang="less" scoped>
.page{
    font-size: 18px;
}
.card{
    margin:50px;
    width: 5.8rem;
    height: 4.3rem;
    display:block;
    background:url(../../common/images/card-demo.png) no-repeat 100% 100%;
    background-size:contain;
}
.notice{
    width: 80%;
    margin-left: 10%;
}
.bind{
    text-align: center;
    border: 1px solid black;
    border-radius:15px;
    margin-top: 30px;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 50px;
    width: 80%;
    margin-left: 10%;
}
.page table{
    margin: 15px;
}
.page input{
    border:1px solid #dadada;
    // background: gray;
    height: 40px;
    margin-left: 20px;
    width: 100%;
}
.next{
    text-align: center;
    border: 1px solid black;
    border-radius:15px;
    margin-top: 30px;
    padding-top: 20px;
    padding-bottom: 20px;
    margin-bottom: 50px;
    width: 80%;
    margin-left: 10%;
}
</style>
