<template>
  <!-- 新增受控策略管理 -->
  <div class="QKbg">
    <!-- <v-header :headerName="headerName"></v-header> -->
    <!-- 新增策略时进入 只显示策略名称、开始日期、结束日期 -->
    <div class="QKStrategyHarder" v-if="StragegryId === null">
      <div class="timeBox">
        <span class="label">策略</span>
        <div class="timeItem">
          <van-field v-model="StragegysForm.name" label="" placeholder="请输入策略名称" label-width="62px" required maxlength="18" />
        </div>
      </div>
      <div class="timeBox">
        <span class="label">有效期</span>
        <div class="timeItem">
          <QKdate :dateValue="StragegysForm.startDate" :dataLabel="dataLabelStart" @changeDate="changeDateStartNew"></QKdate>
        </div>
        <div class="timeItem">
          <QKdate :dateValue="StragegysForm.endDate" :dataLabel="dataLabelEnd" @changeDate="changeDateEndNew"></QKdate>
        </div>
      </div>
    </div>
    <!-- 点击新增时出现的样式, 如果策略新增成功后，不再显示 -->
    <div class="FunctionBoxItem" v-show="detailAddShowNew" @click="addStrategyChange(StragegysForm)">
      <div class="strategyTimeTitleBox">
        <div class="strategyTimeTitle">有效时间</div>
        <div class="flex1">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-time-picker size="mini" style="width:100%" v-model="startTime" placeholder="起始时间" value-format="HH:mm:ss" :disabled="newDisabled">
              </el-time-picker>
            </el-col>
            <div style="position: absolute;left: 50%;">-</div>
            <el-col :span="12">
              <el-time-picker size="mini" style="width:100%" placeholder="结束时间" v-model="endTime" value-format="HH:mm:ss" :disabled="newDisabled">
              </el-time-picker>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="FunctionBox">
        <!-- 语音 -->
        <div class="FunctionItem">
          <div class="functionItemHeader">
            <img class="functionImg" :src="telLogo" alt="">
            <div class="functionTitle">{{voiceTitle}}</div>
          </div>
          <div class="functionSwitch">
            <van-switch v-model="voiceSwitch" size="16px" active-color="#7ED024" inactive-color="#fff" :disabled="newDisabled" />
          </div>
          <div class="functionExplain" v-if="voiceSwitch === true">{{voiceExplain}}</div>
          <div class="functionExplain" v-else>{{NOvoiceExplain}}</div>
        </div>
        <!-- 短信 -->
        <div class="FunctionItem">
          <div class="functionItemHeader">
            <img class="functionImg" :src="smsIcon" alt="">
            <div class="functionTitle">{{smsTitle}}</div>
          </div>
          <div class="functionSwitch">
            <van-switch v-model="smsSwitch" size="16px" active-color="#7ED024" inactive-color="#fff" :disabled="newDisabled" />
          </div>
          <div class="functionExplain" v-if="smsSwitch === true">{{smsExplain}}</div>
          <div class="functionExplain" v-else>{{NOsmsExplain}}</div>
        </div>
        <!-- 流量  -->
        <div class="FunctionItem">
          <div class="functionItemHeader">
            <img class="functionImg" :src="networkIcon" alt="">
            <div class="functionTitle">{{networkTitle}}</div>
          </div>
          <div class="functionSwitch">
            <van-switch v-model="networkSwitch" size="16px" active-color="#7ED024" inactive-color="#fff" :disabled="newDisabled" />
          </div>
          <div class="functionExplain" v-if="networkSwitch === true">{{networkExplain}}</div>
          <div class="functionExplain" v-else>{{NOnetworkExplain}}</div>
        </div>
      </div>
      <div class="weekList">
        <span v-for="item in weekList" :key="item.id" class="checkboxlist">
          <label :for="item.name">
            <div class="checkbox" :class="checkboxGroup.indexOf(item.name)!=-1?'checked':''"></div>
            <input type="checkbox" :id="item.id" v-model="checkboxGroup" :value="item.id"><span class="checkboxName" :disabled="newDisabled">{{item.name}}</span>
          </label>
        </span>
      </div>
    </div>
    <!-- 新增策略明细/修改策略时 显示的内容 -->
    <div v-for=" StragegysItem in ControlgroupsStragegys" :key="StragegysItem.id" v-show="StragegysItem.id === StragegryId">
      <!-- 修改策略信息 -->
      <div class="QKStrategyHarder">
        <div class="timeBox">
          <span class="label">策略</span>
          <div class="timeItem">
            <van-field v-model="StragegysItem.name" label="" placeholder="请输入策略名称" label-width="62px" required maxlength="18" @change="strategyChange(StragegysItem)" />
          </div>
        </div>
        <div class="timeBox">
          <span class="label">有效期</span>
          <div class="timeItem">
            <QKdate :dateValue="StragegysItem.startDate" :dataLabel="dataLabelStart" :straegyId="StragegysItem.id" @changeDate="changeDateStart"></QKdate>
          </div>
          <div class="timeItem">
            <QKdate :dateValue="StragegysItem.endDate" :dataLabel="dataLabelEnd" :straegyId="StragegysItem.id" @changeDate="changeDateEnd"></QKdate>
          </div>
        </div>
      </div>
      <!-- 点击新增明细时出现的样式 -->
      <div class="FunctionBoxItem" v-show="detailAddShow || StragegysItem.details.length === 0">
        <div class="buttom_item_box">
          <div class="closeIcon" @click="detailAddShow = false">删除</div>
        </div>
        <div class="timeBox">
          <div class="timeItem">
            <QKdatetime :timeValue="startTime" :timeLabel="timeLabelStart" @changeTime="StartChangeTimeNew" :straegyId="StragegysItem.id"></QKdatetime>
          </div>
          <div class="timeItem">
            <QKdatetime :timeValue="endTime" :timeLabel="timeLabelEnd" @changeTime="EndChangeTimeNew" :straegyId="StragegysItem.id"></QKdatetime>
          </div>
        </div>
        <div class="FunctionBox">
          <!-- 语音 -->
          <div class="FunctionItem">
            <div class="functionItemHeader">
              <img class="functionImg" :src="telLogo" alt="">
              <div class="functionTitle">{{voiceTitle}}</div>
            </div>
            <div class="functionSwitch">
              <van-switch v-model="voiceSwitch" size="16px" active-color="#7ED024" inactive-color="#fff" />
            </div>
            <div class="functionExplain" v-if="voiceSwitch === true">{{voiceExplain}}</div>
            <div class="functionExplain" v-else>{{NOvoiceExplain}}</div>
          </div>
          <!-- 短信 -->
          <div class="FunctionItem">
            <div class="functionItemHeader">
              <img class="functionImg" :src="smsIcon" alt="">
              <div class="functionTitle">{{smsTitle}}</div>
            </div>
            <div class="functionSwitch">
              <van-switch v-model="smsSwitch" size="16px" active-color="#7ED024" inactive-color="#fff" />
            </div>
            <div class="functionExplain" v-if="smsSwitch === true">{{smsExplain}}</div>
            <div class="functionExplain" v-else>{{NOsmsExplain}}</div>
          </div>
          <!-- 流量  -->
          <div class="FunctionItem">
            <div class="functionItemHeader">
              <img class="functionImg" :src="networkIcon" alt="">
              <div class="functionTitle">{{networkTitle}}</div>
            </div>
            <div class="functionSwitch">
              <van-switch v-model="networkSwitch" size="16px" active-color="#7ED024" inactive-color="#fff" />
            </div>
            <div class="functionExplain" v-if="networkSwitch === true">{{networkExplain}}</div>
            <div class="functionExplain" v-else>{{NOnetworkExplain}}</div>
          </div>
        </div>
        <div class="weekList">
          <span v-for="item in weekList" :key="'A' + item.id" class="checkboxlist">
            <label :for="item.name">
              <div class="checkbox" :class="checkboxGroup.indexOf(item.name)!=-1?'checked':''"></div>
              <input type="checkbox" :id="item.id" v-model="checkboxGroup" :value="item.id"><span class="checkboxName">{{item.name}}</span>
            </label>
          </span>
        </div>
      </div>
      <!-- 策略明细显示及编辑 -->
      <div class="FunctionBoxItem" v-for="detailsItem in StragegysItem.details" :key="detailsItem.id">
        <div class="buttom_item_box">
          <div class="closeIcon" @click="detailsDel(detailsItem)">删除</div>
        </div>
        <div class="timeBox">
          <div class="timeItem">
            <QKdatetime :timeValue="detailsItem.start_time" :timeLabel="timeLabelStart" @changeTime="StartChangeTime" :straegyId="StragegysItem.id" :straegyDetailsId="detailsItem.id"></QKdatetime>
          </div>
          <div class="timeItem">
            <QKdatetime :timeValue="detailsItem.end_time" :timeLabel="timeLabelEnd" @changeTime="EndChangeTime" :straegyId="StragegysItem.id" :straegyDetailsId="detailsItem.id"></QKdatetime>
          </div>
        </div>
        <div class="FunctionBox">
          <!-- 语音 -->
          <div class="FunctionItem">
            <div class="functionItemHeader">
              <img class="functionImg" :src="telLogo" alt="">
              <div class="functionTitle">{{voiceTitle}}</div>
            </div>
            <div class="functionSwitch">
              <van-switch v-model="detailsItem.card_voice_statue" size="16px" active-color="#7ED024" inactive-color="#fff" @change="checkboxGroupChange(detailsItem)" :disabled="disabledShow" />
            </div>
            <div class="functionExplain" v-if="detailsItem.card_voice_statue === true">{{voiceExplain}}</div>
            <div class="functionExplain" v-else>{{NOvoiceExplain}}</div>
          </div>
          <!-- 短信 -->
          <div class="FunctionItem">
            <div class="functionItemHeader">
              <img class="functionImg" :src="smsIcon" alt="">
              <div class="functionTitle">{{smsTitle}}</div>
            </div>
            <div class="functionSwitch">
              <van-switch v-model="detailsItem.card_sms_statue" size="16px" active-color="#7ED024" inactive-color="#fff" @change="checkboxGroupChange(detailsItem)" :disabled="disabledShow" />
            </div>
            <div class="functionExplain" v-if="detailsItem.card_sms_statue === true">{{smsExplain}}</div>
            <div class="functionExplain" v-else>{{NOsmsExplain}}</div>
          </div>
          <!-- 流量  -->
          <div class="FunctionItem">
            <div class="functionItemHeader">
              <img class="functionImg" :src="networkIcon" alt="">
              <div class="functionTitle">{{networkTitle}}</div>
            </div>
            <div class="functionSwitch">
              <van-switch v-model="detailsItem.card_data_statue" size="16px" active-color="#7ED024" inactive-color="#fff" @change="checkboxGroupChange(detailsItem)" :disabled="disabledShow" />
            </div>
            <div class="functionExplain" v-if="detailsItem.card_data_statue === true">{{networkExplain}}</div>
            <div class="functionExplain" v-else>{{NOnetworkExplain}}</div>
          </div>
        </div>
        <div class="weekList">
          <span v-for="item in weekList" :key="'B'+item.id" class="checkboxlist">
            <label :for="item.name" v-if="detailsItem.day_of_week === null">
              <div class="checkbox" :class="checkboxWeeks.indexOf(item.name)!=-1?'checked':''"></div>
              <input type="checkbox" :id="item.id" v-model="checkboxWeeks" :value="item.id" @change="checkboxGroupChange(detailsItem)"><span class="checkboxName">{{item.name}}</span>
            </label>
            <label :for="item.name" v-else>
              <div class="checkbox" :class="detailsItem.day_of_week.indexOf(item.name)!=-1?'checked':''"></div>
              <input type="checkbox" :id="item.id" v-model="detailsItem.day_of_week" :value="item.id" @change="checkboxGroupChange(detailsItem)"><span class="checkboxName">{{item.name}}</span>
            </label>
          </span>
        </div>
      </div>
    </div>

    <div class="plusBox">
      <van-icon class="strategyIcon" name="plus" size="30px" color="#ffb525" @click="plusShow" />
    </div>
    <div class="bottonTarbar">
      <div class="SKCLAddButton" @click="CompleteTheSetup">完成设置</div>
      <div class="SKCLAddButton" @click="cancel">取消</div>
    </div>
  </div>
</template>

<script>
// import VHeader from './../header'
import telLogo from 'common/images/voiceIcon.png'
import smsIcon from 'common/images/smsIcon.png'
import networkIcon from 'common/images/networkIcon.png'
import QKdatetime from './base/QKdatetime'
import QKdate from './base/QKdate'
import API from 'api/groupcontrol'
export default {
  inject: ['reload'], // 注入App里的reload方法
  data () {
    return {
      headerName: '设置受控策略管理',
      ControlgroupsStragegys: [{
        code: '0114001',
        details: [
          {
            card_data_statue: true,
            card_sms_statue: true,
            card_voice_statue: true,
            create_time: '2021-01-14 01:00:22',
            current: true,
            day_of_week: [0, 1],
            end_date: '2021-01-12',
            end_time: '10:00:00',
            id: 1,
            start_date: '2021-01-01',
            start_time: '08:00:00',
            strategy_id: 1
          },
          {
            card_data_statue: true,
            card_sms_statue: true,
            card_voice_statue: true,
            create_time: '2021-01-14 01:00:22',
            current: true,
            day_of_week: [0, 1],
            end_date: '2021-01-12',
            end_time: '10:00:00',
            id: 2,
            start_date: '2021-01-01',
            start_time: '08:00:00',
            strategy_id: 1
          }
        ],
        endDate: '2021-01-12',
        id: 1,
        name: '本地数据',
        startDate: '2021-01-01',
        status: 1
      }],
      telLogo: telLogo,
      smsIcon: smsIcon,
      networkIcon: networkIcon,
      voiceTitle: '语音通话',
      smsTitle: '短信业务',
      networkTitle: '网络服务',
      voiceSwitch: true,
      smsSwitch: true,
      networkSwitch: true,
      voiceExplain: '允许语音通话',
      smsExplain: '允许收发短信',
      networkExplain: '允许上网',
      NOvoiceExplain: '禁止语音通话',
      NOsmsExplain: '禁止收发短信',
      NOnetworkExplain: '禁止上网',
      startTime: '',
      endTime: '',
      weekList: [
        {
          id: 1,
          name: '星期日'
        },
        {
          id: 2,
          name: '星期一'
        },
        {
          id: 3,
          name: '星期二'
        },
        {
          id: 4,
          name: '星期三'
        },
        {
          id: 5,
          name: '星期四'
        },
        {
          id: 6,
          name: '星期五'
        },
        {
          id: 7,
          name: '星期六'
        }
      ],
      checkboxGroup: [],
      checkboxWeeks: [],
      StragegysForm: {
        name: null,
        startDate: null,
        endDate: null
      },
      StragegysEditForm: {
        name: null,
        startDate: null,
        endDate: null
      },
      disabledShow: false,
      StragegryId: '',
      StragegysDetailId: null,
      detailAddShow: false,
      detailAddShowNew: false,
      newDisabled: true,
      timeLabelStart: '开始时间',
      timeLabelEnd: '结束时间',
      dataLabelStart: '开始日期',
      dataLabelEnd: '结束日期',
      newStragegyDetail: [],
      newStragegyDetailEnd: []
    }
  },
  components: {
    // VHeader
    QKdatetime,
    QKdate
  },
  created () {
    this.getGroupcontrolControlgroups()
    this.StragegryId = JSON.parse(localStorage.getItem('StragegryId'))
    // this.StragegryId = 1
    // this.reload() 刷新页面
    if (this.StragegryId === null) {
      this.detailAddShowNew = true
    }
  },
  computed: {
  },
  methods: {
    timeFormat (time) { // 时间格式化 2019-09-08
      const year = time.getFullYear()
      const month = time.getMonth() + 1
      const day = time.getDate()
      return year + '-' + month + '-' + day
    },
    // 新增
    addStrategyChange (row) {
      if (this.StragegysForm.name === null) {
        this.$toast('策略名称不能为空，请输入策略名称。')
      } else if (this.StragegysForm.startDate === null) {
        this.$toast('开始日期不能空，请选择开始日期')
      } else if (this.StragegysForm.endDate === null) {
        this.$toast('结束日期不能空，请选择结束日期')
      } else if (this.StragegysForm.startDate > this.StragegysForm.endDate) {
        this.$toast('开始日期不能大于结束日期')
      } else {
        this.$dialog.confirm({
          title: '提醒',
          message: '您确定要新增此条策略信息吗!'
        }).then(() => {
          const data = {
            endDate: this.StragegysForm.endDate,
            name: this.StragegysForm.name,
            startDate: this.StragegysForm.startDate
          }
          API.apiStragegysAdd(data).then(res => {
            if (res.resultCode === 0) {
              this.StragegryId = res.data
              localStorage.setItem('StragegryId', JSON.stringify(this.StragegryId))
              this.getGroupcontrolControlgroups()
              this.detailAddShowNew = false
            } else {
              const resultData = this.stringHandle(res.resultInfo)
              this.$toast(resultData)
            }
          })
        }).catch(() => {
        })
      }
    },
    // 开始日期
    changeDateStart (date, id) {
      const data = {
        startDate: date,
        id: id
      }
      API.apiStragegysModify(data).then(res => {
        if (res.resultCode === 0) {
          this.getGroupcontrolControlgroups()
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    changeDateStartNew (date) {
      this.StragegysForm.startDate = date
      if (this.StragegysForm.startDate > this.StragegysForm.endDate) {
        this.$toast('开始日期不能大于结束日期')
      }
    },
    // 结束日期
    changeDateEnd (date, id) {
      const data = {
        endDate: date,
        id: id
      }
      API.apiStragegysModify(data).then(res => {
        if (res.resultCode === 0) {
          this.getGroupcontrolControlgroups()
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    changeDateEndNew (date) {
      this.StragegysForm.endDate = date
      if (this.StragegysForm.startDate > this.StragegysForm.endDate) {
        this.$toast('开始日期不能大于结束日期')
      }
    },

    // 点击新增策略明细
    plusShow () {
      this.detailAddShow = true
      if (this.StragegryId === null || this.StragegryId === '') {
        if (this.StragegysForm.name === null) {
          this.$toast('策略名称不能为空，请输入策略名称。')
        } else if (this.StragegysForm.startDate === null) {
          this.$toast('开始日期不能空，请选择开始日期')
        } else if (this.StragegysForm.endDate === null) {
          this.$toast('结束日期不能空，请选择结束日期')
        } else if (this.StragegysForm.startDate > this.StragegysForm.endDate) {
          this.$toast('开始日期不能大于结束日期')
        }
      } else if (this.startTime === null || this.startTime === '') {
        this.$toast('开始时间不能为空，请输入开始时间')
      } else if (this.endTime === null || this.endTime === '') {
        this.$toast('结束时间不能为空，请输入结束时间')
      } else if (this.startTime > this.endTime) {
        this.$toast('开始时间不能大于结束时间')
      } else if (this.checkboxGroup.length === 0) {
        this.$toast('星期不能为空，请输入星期')
      } else {
        this.$dialog.confirm({
          title: '提醒',
          message: '您确定要新增此条信息吗!'
        }).then(() => {
          const data = {
            cardDataStatue: Number(this.networkSwitch),
            cardSmsStatue: Number(this.smsSwitch),
            cardVoiceStatue: Number(this.voiceSwitch),
            dayOfWeeks: this.checkboxGroup,
            endTime: this.endTime,
            startTime: this.startTime,
            stragegyId: this.StragegryId
          }
          API.apiStragegysDetailAdd(data).then(res => {
            if (res.resultCode === 0) {
              this.getGroupcontrolControlgroups()
              this.detailAddShow = false
              this.endTime = null
              this.startTime = null
              this.checkboxGroup.length = 0
            } else {
              const resultData = this.stringHandle(res.resultInfo)
              this.$toast(resultData)
            }
          })
        }).catch(() => {
        })
      }
    },
    // 完成设置
    CompleteTheSetup () {
      if (this.StragegryId === null || this.StragegryId === '') {
        if (this.StragegysForm.name === null) {
          this.$toast('策略名称不能为空，请输入策略名称。')
        } else if (this.StragegysForm.startDate === null) {
          this.$toast('开始日期不能空，请选择开始日期')
        } else if (this.StragegysForm.endDate === null) {
          this.$toast('结束日期不能空，请选择结束日期')
        } else if (this.StragegysForm.startDate > this.StragegysForm.endDate) {
          this.$toast('开始日期不能大于结束日期')
        } else {
          this.$dialog.confirm({
            title: '提醒',
            message: '您确定要新增此条策略信息吗!'
          }).then(() => {
            const data = {
              endDate: this.StragegysForm.endDate,
              name: this.StragegysForm.name,
              startDate: this.StragegysForm.startDate
            }
            API.apiStragegysAdd(data).then(res => {
              if (res.resultCode === 0) {
                this.StragegryId = res.data
                localStorage.setItem('StragegryId', JSON.stringify(this.StragegryId))
                this.getGroupcontrolControlgroups()
                this.detailAddShowNew = false
                this.$router.push({
                  path: '/controlledStrategy'
                })
              } else {
                const resultData = this.stringHandle(res.resultInfo)
                this.$toast(resultData)
              }
            })
          }).catch(() => {
          })
        }
      } else if (this.detailAddShowNew === true) {
        if (this.startTime === null || this.startTime === '') {
          this.$toast('开始时间不能为空，请输入开始时间')
        } else if (this.endTime === null || this.endTime === '') {
          this.$toast('结束时间不能为空，请输入结束时间')
        } else if (this.checkboxGroup.length === 0) {
          this.$toast('星期不能为空，请输入星期')
        } else {
          this.$dialog.confirm({
            title: '提醒',
            message: '您确定要新增此条信息吗!'
          }).then(() => {
            const data = {
              cardDataStatue: Number(this.networkSwitch),
              cardSmsStatue: Number(this.smsSwitch),
              cardVoiceStatue: Number(this.voiceSwitch),
              dayOfWeeks: this.checkboxGroup,
              endTime: this.endTime,
              startTime: this.startTime,
              stragegyId: this.StragegryId
            }
            API.apiStragegysDetailAdd(data).then(res => {
              if (res.resultCode === 0) {
                this.getGroupcontrolControlgroups()
                this.detailAddShow = false
                this.endTime = null
                this.startTime = null
                this.checkboxGroup.length = 0
                this.$router.push({
                  path: '/controlledStrategy'
                })
              } else {
                const resultData = this.stringHandle(res.resultInfo)
                this.$toast(resultData)
              }
            })
          }).catch(() => {
          })
        }
      } else {
        this.$dialog.confirm({
          title: '提醒',
          message: '完成设置!'
        }).then(() => {
          this.$router.push({
            path: '/controlledStrategy'
          })
        }).catch(() => {
        })
      }
    },
    cancel () {
      this.$router.push({
        path: '/controlledStrategy'
      })
    },
    // 开始时间
    StartChangeTime (date, Vid, detailId) {
      const data = {
        startTime: date,
        id: detailId,
        stragygyId: this.StragegryId
      }
      this.modifyStrategyDetailPost(data)
      // this.newStragegyDetail.unshift(data)

      // var map = {}; var dest = []
      // for (var i = 0; i < this.newStragegyDetail.length; i++) {
      //   var ai = this.newStragegyDetail[i]
      //   if (!map[ai.id]) {
      //     dest.push({
      //       id: ai.id,
      //       stragygyId: ai.stragygyId,
      //       startTime: ai.startTime
      //     })
      //     map[ai.id] = ai
      //   }
      // };
      // console.log(JSON.stringify(dest))
    },
    StartChangeTimeNew (date, id) {
      this.startTime = date
    },

    // 结束时间
    EndChangeTime (date, id, detailId) {
      const data = {
        endTime: date,
        id: detailId,
        stragygyId: id
      }
      this.modifyStrategyDetailPost(data)
      // this.newStragegyDetailEnd.unshift(data)

      // var map = {}; var dest = []
      // for (var i = 0; i < this.newStragegyDetailEnd.length; i++) {
      //   var ai = this.newStragegyDetailEnd[i]
      //   if (!map[ai.id]) {
      //     dest.push({
      //       id: ai.id,
      //       stragygyId: ai.stragygyId,
      //       endTime: ai.endTime
      //     })
      //     map[ai.id] = ai
      //   }
      // };
      // console.log(JSON.stringify(dest))
    },
    EndChangeTimeNew (date, id) {
      this.endTime = date
    },
    // 获取最新策略信息
    getGroupcontrolControlgroups () {
      API.apiControlgroupsStragegys().then(res => {
        if (res.resultCode === 0) {
          this.ControlgroupsStragegys = res.data.reverse()
        } else {
          this.$toast(res.resultInfo)
        }
      })
    },
    // 监听 策略
    strategyChange (row) {
      this.modifyStrategyPost(row)
    },
    // 监听 策略明细
    checkboxGroupChange (detailsItem) {
      if (detailsItem.day_of_week !== null || detailsItem.day_of_week !== '') {
        const data = {
          cardDataStatue: Number(detailsItem.card_data_statue),
          cardSmsStatue: Number(detailsItem.card_sms_statue),
          cardVoiceStatue: Number(detailsItem.card_voice_statue),
          dayOfWeeks: detailsItem.day_of_week,
          endTime: detailsItem.end_time,
          id: detailsItem.id,
          startTime: detailsItem.start_time,
          stragygyId: this.StragegryId
        }
        this.modifyStrategyDetailPost(data)
      } else {
        const data = {
          cardDataStatue: Number(detailsItem.card_data_statue),
          cardSmsStatue: Number(detailsItem.card_sms_statue),
          cardVoiceStatue: Number(detailsItem.card_voice_statue),
          endTime: detailsItem.end_time,
          id: detailsItem.id,
          startTime: detailsItem.start_time,
          stragygyId: this.StragegryId
        }
        this.modifyStrategyDetailPost(data)
      }
    },
    // 修改策略
    modifyStrategyPost (row) {
      this.$dialog.confirm({
        title: '提醒',
        message: '您确定要更改信息吗!'
      }).then(() => {
        const data = {
          endDate: row.endDate,
          id: row.id,
          name: row.name,
          startDate: row.startDate,
          status: row.status
        }
        API.apiStragegysModify(data).then(res => {
          if (res.resultCode === 0) {
            this.getGroupcontrolControlgroups()
          } else {
            this.$toast(res.resultInfo)
          }
        })
      }).catch(() => {
        this.reload()
      })
    },
    // 修改策略明细 --- 已测试 成功
    modifyStrategyDetailPost (row) {
      API.apiStragegysDetailModify(row).then(res => {
        if (res.resultCode === 0) {
          this.getGroupcontrolControlgroups()
        } else {
        }
      })
    },
    // 删除策略明细  --- 已测试 成功
    detailsDel (row) {
      const detailId = row.id
      this.$dialog.confirm({
        title: '提醒',
        message: '您确定要删除吗!'
      }).then(() => {
        API.apiStragegysDetailDel(detailId).then(res => {
          if (res.resultCode === 0) {
            this.getGroupcontrolControlgroups()
          } else {
            this.$toast(res.resultInfo)
            const resultInfo = this.stringHandle(res.resultInfo)
            this.$toast(resultInfo)
          }
        })
      }).catch(() => {
      })
    },
    stringHandle (handleData) {
      var str = handleData
      var newString = str.split(':')
      return newString[2]
    }
  }
}
</script>

<style lang="less" scoped>
.el-input__inner {
  border: 0;
}
.QKbg {
  background: #f2f2f2;
  height: 100%;
}
.FunctionBoxItem {
  position: relative;
  background: #fff;
  margin: 10px;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
}
.FunctionBoxItem:last-child {
  margin-bottom: 100px;
}
.QKStrategyHarder {
  background-color: #fff;
}
.weekList {
  font-size: 12px;
  display: flex;
  height: 29px;
  border-top: 1px solid #f0f0f0;
  justify-content: center;
  align-items: center;
  span {
    flex: 1;
    text-align: center;
    line-height: 20px;
    input {
      vertical-align: middle;
    }
    input[type='checkbox']:checked {
      color: red;
    }
  }
}
.buttom_item_box {
  border-bottom: 1px solid #f0f0f0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  .closeIcon {
    width: 50px;
    font-size: 14px;
    background: red;
    border-radius: 4px;
    margin: 5px;
    color: #fff;
    line-height: 24px;
    text-align: center;
  }
}
.timeBox {
  display: flex;
  line-height: 34px;
  border-bottom: 1px solid #f0f0f0;
  font-size: 14px;
  .label {
    margin-left: 16px;
    width: 55px;
    text-align: right;
  }
  .timeItem {
    font-size: 14px;
    flex: 1;
    border-right: 1px solid #f0f0f0;
  }
  .timeItem:last-child {
    border-right: 0;
  }
}
.strategyTimeTitleBox {
  display: flex;
  line-height: 36px;
  font-size: 12px;
  margin: 0 10px;
}
.flex1 {
  flex: 1;
}
.strategyTimeTitle {
  width: 60px;
}
.FunctionBox {
  display: flex;
  border-top: 1px solid #ededed;
}
.plusBox {
  position: fixed;
  bottom: 40px;
  left: 0;
  background: #fff;
  height: 40px;
  line-height: 40px;
  width: 100%;
  z-index: 2000;
}
.bottonTarbar {
  position: fixed;
  bottom: 0;
  left: 0;
  background: #ffb525;
  height: 40px;
  line-height: 40px;
  width: 100%;
  display: flex;
  z-index: 2000;
  .SKCLAddButton {
    color: #fff;
    font-size: 16px;
    flex: 1;
    border-right: 1px solid #fff;
    text-align: center;
  }
  .SKCLAddButton:last-child {
    border-right: 0;
  }
}
.FunctionItem {
  flex: 1;
  border-right: 1px solid #ededed;
  .functionItemHeader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 32px;
    .functionImg {
      display: inline-block;
      vertical-align: middle;
      width: 20px;
      height: 20px;
    }
    .functionTitle {
      font-size: 14px;
      margin-left: 8px;
    }
  }
  .functionSwitch {
    text-align: center;
    line-height: 30px;
    .van-switch {
      vertical-align: middle;
    }
  }
  .functionExplain {
    font-size: 12px;
    text-align: center;
    line-height: 30px;
  }
}
.FunctionItem:last-child {
  border-right: 0;
}
.confirmButton {
  margin: 5px;
  font-size: 14px;
  width: 50px;
  height: 30px;
  background: #ffb525;
  line-height: 30px;
  text-align: center;
  color: #fff;
  float: right;
  border-radius: 4px;
}
.checkboxlist {
  position: relative;
}
.checkboxlist label {
  // margin-left: 10px;
}
.checkboxlist .checkbox {
  display: inline-block;
  // width: 14px;
  height: 14px;
}
.checkboxlist .checkbox.checked {
  background: #0075ff;
}
.checkboxlist input[type='checkbox']:checked ~ span {
  color: #0075ff;
}
.checkboxlist input {
  opacity: 0;
  width: 0.8rem;
  position: absolute;
  line-height: 0.44rem;
  height: 0.44rem;
  z-index: 999;
}
</style>
