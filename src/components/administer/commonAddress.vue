<template>
  <div class="commonAddress_info">
    <!-- 常用位置 -->
    <!-- <v-header :headerName="headerName"></v-header> -->
    <div class="g-card">
      <div class="card-info">
        <div class="person-box">
          <div class="person-logo">
            <img v-if="OrdersDetails.iconUrl === ''" :src="imageUrls" alt="用户头像">
            <img v-else :src="OrdersDetails.iconUrl" alt="用户头像">
          </div>
          <div class="person-name">{{OrdersDetails.studentName}}</div>
        </div>

        <div class="info-box">
          <div class="info-list">
            <div style="text-align: right;width: 1.2rem;float: left;">手机号:</div>
            <span>{{OrdersDetails.cardNo}}</span>
          </div>
          <div class="info-list">
            <div style="text-align: right;width: 1.2rem;float: left;">ICCID:</div>
            <span>{{OrdersDetails.iccid}}</span>
          </div>
          <div class="info-list">
            <div style="text-align: right;width: 1.2rem;float: left;">当前余额:</div>
            <span>{{OrdersDetails.remainPrice}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="limit"></div>
    <!-- address card -->
    <div class="address-card">
      <div class="address-name">
        <span class="address-icon"><img src="../../common/images/home2.png" alt=""></span>
        <span class="address-category">家</span>
        <van-icon @click="onClick_addPosition(0)" class="address-add" name="add-o" />
      </div>
      <div class="address-item" v-for="item in homeList" v-show="item.type === 0" :key="'A' + item.id">
        <div class="remarks">
          <div class="remarks-name" v-if="item.addressTitle!=''" @click="onClick_isUpDataName(item)">{{item.addressTitle}}</div>
          <div class="remarks-name" style="color: #aaaaaa" v-if="item.addressTitle==''" @click="onClick_isUpDataName(item)">点击设置备注名</div>
          <van-icon class="address-delete" name="delete" @click="onClick_dltItem('homeList',item)" />
        </div>
        <div class="address" @click="onClick_changePosition(0,item)">{{item.address}}</div>
        <div class="remindBox">
          <div class="remindItem">
            <van-switch v-model="item.isBackAlert" class="remindIcon" size="16px" active-color="#7ED024" inactive-color="#fff" @change="onChange_switch(item,'isBackAlert')" />
            <span class="remindText">到家提醒</span>
          </div>
          <div class="remindItem">
            <van-switch v-model="item.isApartAlert" class="remindIcon" size="16px" active-color="#7ED024" inactive-color="#fff" @change="onChange_switch(item,'isApartAlert')" />
            <span class="remindText">离家提醒</span>
          </div>
        </div>
      </div>

      <div class="address-item" v-show="homeList.length === 0" @click="onClick_addPosition(0)">
        <div class="noneAddress">当前暂无设置位置，请添加</div>
      </div>

      <div class="address-name">
        <span class="address-icon"><img src="../../common/images/school.png" alt=""></span>
        <span class="address-category">学校</span>
        <van-icon class="address-add" name="add-o" @click="onClick_addPosition(1)" />
      </div>
      <div class="address-item" v-for="item in schoolList" v-show="item.type === 1" :key="'B' + item.id">
        <div class="remarks">
          <div class="remarks-name" v-if="item.addressTitle!=''" @click="onClick_isUpDataName(item)">{{item.addressTitle}}</div>
          <div class="remarks-name" style="color: #aaaaaa" v-if="item.addressTitle==''" @click="onClick_isUpDataName(item)">点击设置备注名</div>
          <van-icon class="address-delete" name="delete" @click="onClick_dltItem('schoolList',item)" />
        </div>
        <div class="address" @click="onClick_changePosition(1,item)">{{item.address}}</div>
        <div class="remindBox">
          <div class="remindItem">
            <van-switch v-model="item.isBackAlert" class="remindIcon" size="16px" active-color="#7ED024" inactive-color="#fff" @change="onChange_switch(item,'isBackAlert')" />
            <span class="remindText">到校提醒</span>
          </div>
          <div class="remindItem">
            <van-switch v-model="item.isApartAlert" class="remindIcon" size="16px" active-color="#7ED024" inactive-color="#fff" @change="onChange_switch(item,'isApartAlert')" />
            <span class="remindText">离校提醒</span>
          </div>
        </div>
      </div>

      <div class="address-item" v-show="schoolList.length === 0" @click="onClick_addPosition(1)">
        <div class="noneAddress">当前暂无设置位置，请添加</div>
      </div>

      <div class="address-name">
        <span class="address-icon"><img src="../../common/images/useAddress.png" alt=""></span>
        <span class="address-category">常用地址</span>
        <van-icon class="address-add" name="add-o" @click="onClick_addPosition(2)" />
      </div>
      <div class="address-item" v-for="item in addressList" v-show="item.type === 2" :key="'C' + item.id">
        <div class="remarks">
          <div class="remarks-name" v-if="item.addressTitle!=''" @click="onClick_isUpDataName(item)">{{item.addressTitle}}</div>
          <div class="remarks-name" style="color: #aaaaaa" v-if="item.addressTitle==''" @click="onClick_isUpDataName(item)">点击设置备注名</div>
          <van-icon class="address-delete" name="delete" @click="onClick_dltItem('addressList',item)" />
        </div>
        <div class="address" @click="onClick_changePosition(2,item)">{{item.address}}</div>
        <div class="remindBox">
          <div class="remindItem">
            <van-switch v-model="item.isBackAlert" class="remindIcon" size="16px" active-color="#7ED024" inactive-color="#fff" @change="onChange_switch(item,'isBackAlert')" />
            <span class="remindText">到达提醒</span>
          </div>
          <div class="remindItem">
            <van-switch v-model="item.isApartAlert" class="remindIcon" size="16px" active-color="#7ED024" inactive-color="#fff" @change="onChange_switch(item,'isApartAlert')" />
            <span class="remindText">离达提醒</span>
          </div>
        </div>
      </div>

      <div class="address-item" v-show="addressList.length === 0" @click="onClick_addPosition(2)">
        <div class="noneAddress">当前暂无设置位置，请添加</div>
      </div>

    </div>
    <!-- 设置备注名 弹框 -->
    <van-dialog v-model="NoteNameDialog" title="设置备注名称" show-cancel-button class="mealContent" :beforeClose="addressTitleSucess">
      <div class="list">
        <van-form :model="NoteNameForm" ref="NoteNameForm">
          <van-field v-model="NoteNameForm.name" label-width="70px" label="备注名" placeholder="请输入备注名" />
        </van-form>
      </div>
    </van-dialog>
  </div>
</template>

<script>
// import vHeader from '../header.vue'
import imageUrls from 'common/images/icon-user.png'
import API from 'api/administer'
export default {
  data () {
    return {
      // headerName: '常用位置',
      NoteNameDialog: false,
      lbsItem: {},
      // 卡详情
      OrdersDetails: {},
      imageUrls,
      NoteNameForm: {
        name: ''
      },
      homeList: [],
      schoolList: [],
      addressList: []
    }
  },
  components: {
    // vHeader
  },
  created () {
    this.OrdersDetails = JSON.parse(sessionStorage.getItem('OrdersDetails'))
    this.getAddressList()
  },
  methods: {
    // 获取地址列表
    getAddressList () {
      const cardNo = this.OrdersDetails.cardNo
      API.apiAddressList(cardNo).then(res => {
        if (res.resultCode === 0) {
          this.homeList = res.data
          this.schoolList = res.data
          this.addressList = res.data
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    onClick_isUpDataName ($item) {
      // console.log($item)
      if ($item.addressTitle !== '') {
        this.NoteNameForm.name = $item.addressTitle
      }
      this.NoteNameForm.id = $item.id
      this.NoteNameForm.isApartAlert = $item.isApartAlert
      this.NoteNameForm.isBackAlert = $item.isBackAlert
      this.NoteNameDialog = true
    },

    //* *************卡列表逻辑******************

    onClick_addPosition ($type) {
      this.$router.push({
        path: '/locpicker',
        query: {
          // token: window.token,
          iccid: this.OrdersDetails.iccid,
          cardNo: this.OrdersDetails.cardNo,
          type: $type,
          status: 'add'
        }
      })
    },
    onClick_changePosition ($type, $item) {
      this.$router.push({
        path: '/locpicker',
        query: {
          // token: window.token,
          iccid: this.OrdersDetails.iccid,
          cardNo: this.OrdersDetails.cardNo,
          type: $type,
          id: $item.id,
          addressTitle: $item.addressTitle,
          status: 'change'
        }
      })
    },
    // 删除地址
    onClick_dltItem ($name, $item) {
      const params = $item.id
      this.$dialog.confirm({
        title: '提醒',
        message: '您确定要删除当前地址吗？'
      }).then(() => {
        API.apiDeleteAddress(params).then(res => {
          if (res.resultCode === 0) {
            this.$toast('已成功删除')
            this.getAddressList()
          } else {
            this.$toast(res.resultInfo)
          }
        })
      }).catch(() => {
      })
    },
    // 切换离家、到家 switch
    onChange_switch ($item, $type) {
      this.isBackAlert = $item.isBackAlert
      this.isApartAlert = $item.isApartAlert
      const config = {
        id: $item.id,
        cardNo: this.OrdersDetails.cardNo,
        isBackAlert: this.isBackAlert,
        isApartAlert: this.isApartAlert
      }
      API.apiIsSwitch(config).then(res => {
        if (res.resultCode === 0) {
          this.$toast('更改成功')
          this.getAddressList()
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // 修改备注确认
    addressTitleSucess (action, done) {
      if (action === 'confirm') {
        setTimeout(done)
        const config = {
          id: this.NoteNameForm.id,
          cardNo: this.OrdersDetails.cardNo,
          addressTitle: this.NoteNameForm.name,
          isApartAlert: this.NoteNameForm.isApartAlert,
          isBackAlert: this.NoteNameForm.isBackAlert
        }
        API.apiRessTitle(config).then(res => {
          if (res.resultCode === 0) {
            this.$toast('更改成功')
            this.getAddressList()
          } else {
            this.$toast(res.resultInfo)
          }
        })
        this.NoteNameForm.name = ''
        this.NoteNameDialog = false
        this.getAddressList()
      } else if (action === 'cancel') {
        done() // 关闭
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import url(../../common/css/commonAddress.less);
</style>
