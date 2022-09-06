<template>
  <div class="page">
    <div class="infos">
        <div class="title">当前有效套餐</div>
        <table>
            <tr>
                <td>套餐名称</td>
                <td class="content">年包套餐</td>
            </tr>
            <tr>
                <td>套餐有效期</td>
                <td class="content">2022.1.20 — 2023.1.19</td>
            </tr>
        </table>
        <div class="title">套餐用量对账单</div>
        <table>
            <tr>
                <td>计费周期</td>
                <td class="content">当月已使用流量</td>
            </tr>
            <tr>
                <td>2022.5.20-2022.6.19</td>
                <td class="content">229.08 GB</td>
            </tr>
            <tr>
                <td>2022.5.20-2022.6.19</td>
                <td class="content">229.08 GB</td>
            </tr>
            <tr>
                <td>2022.5.20-2022.6.19</td>
                <td class="content">229.08 GB</td>
            </tr>
        </table>
        <div class="title">当月已购加油包</div>
        <table>
            <tr>
                <td>50G   加油包</td>
                <td class="content">1个</td>
            </tr>
            <tr>
                <td>50G   加油包</td>
                <td class="content">1个</td>
            </tr>
        </table>
    </div>
    <div class="next-package">
            <div class="unvalid-packages">未生效套餐</div>
            <table>
                <tr>
                    <td>套餐名称</td>
                    <td class="content">半年包套餐</td>
                </tr>
                <tr>
                    <td>套餐有效期</td>
                    <td class="content">2023.1.20 — 2023.7.19</td>
                </tr>
                <tr>
                    <td>套餐名称</td>
                    <td class="content">月包套餐</td>
                </tr>
                <tr>
                    <td>套餐有效期</td>
                    <td class="content">2023.1.20 — 2023.7.19</td>
                </tr>
            </table>
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
    background: silver;
}
.title{
    margin-top: 30px;
    font-weight:bolder;
    color: #f59a23
}
.infos{
    width: 93%;
    margin-left: 0.5%;
    background: white;
    padding: 3%;
}
.infos table{
    margin: 10px;
    width: 99%;
}
tr{
    height: 40px;
}
td{
    color: #aaa
}
.content{
    text-align: right;
}
.next-package{
    width: 96%;
    margin-left: 0.5%;
    margin-top: 3px;
    background: white;
    padding-left: 3%;
}
.next-package table{
    margin-top: 5px;
    padding-bottom: 30px;
    width: 99%;
}
.unvalid-packages{
    padding-top: 10px;
    font-weight:bolder;
    color: #f59a23;
}
</style>
