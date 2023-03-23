<script lang="ts" setup>
import { ref } from "vue";
import MyMap from "@/components/MyMap/index.vue";

defineOptions({
  name: "addEmergency"
});
const addEmergencyFrom = ref({
  //   突发事件任务名称
  taskName: "",
  //   开始时间
  startTime: "",
  //   结束时间
  endTime: "",
  //   过滤来自同城
  filterSameCity: true,
  // 同城列表
  sameCityList: ["Shanghai", "Beijing"],
  //   过滤来自用户组
  filterUserGroup: true,
  // 用户组列表
  userGroupList: ["组1", "组2"],
  //   视频发布周期
  videoPublishCycle: true,
  // 视频发布周期时间列表
  videoPublishCycleList: ["<6h", "<12h"],
  //   关键字
  keyword: "",
  // 匹配模式
  matchMode: "1",
  //   关键词 或
  keywordOr: "",
  //   关键词 与1
  keywordAnd1: "",
  //   关键词 与2
  keywordAnd2: "",
  //   关键词 非
  keywordNot: "",
  // 开启推送
  openPush: false,
  //   推送到钉钉
  pushToDingDing: false,
  //   推送间隔
  pushInterval: "1"
});

// from 全选 复选 S --------------------------------
// 全部属地同城
const checkAllSameCity = ref(false);
const isIndeterminate = ref(true);
const cities = ["Shanghai", "Beijing", "Guangzhou", "Shenzhen"];

const checkAllSameCityChange = (val: boolean) => {
  addEmergencyFrom.value.sameCityList = val ? cities : [];
  isIndeterminate.value = false;
};
const checkedCitiesChange = (value: string[]) => {
  const checkedCount = value.length;
  checkAllSameCity.value = checkedCount === cities.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length;
};

// 全部用户组
const checkAllUserGroup = ref(false);
const isIndeterminateUserGroup = ref(true);
const userGroups = ["组1", "组2", "组3", "组4"];

const checkAllUserGroupChange = (val: boolean) => {
  addEmergencyFrom.value.userGroupList = val ? userGroups : [];
  isIndeterminateUserGroup.value = false;
};
const checkedUserGroupsChange = (value: string[]) => {
  const checkedCount = value.length;
  checkAllUserGroup.value = checkedCount === userGroups.length;
  isIndeterminateUserGroup.value =
    checkedCount > 0 && checkedCount < userGroups.length;
};

// ------全部视频发布周期------
const checkAllVideoPublishCycle = ref(false);
const isIndeterminateVideoPublishCycle = ref(true);
const videoPublishCycles = [
  "<6h",
  "<12h",
  "<1d",
  "<3d",
  "<7d",
  "<1m",
  "<3m",
  "<6m"
];
// 是否自定义发布周期时间
const isCustomVideoPublishCycle = ref(false);
const checkAllVideoPublishCycleChange = (val: boolean) => {
  addEmergencyFrom.value.videoPublishCycleList = val ? videoPublishCycles : [];
  isIndeterminateVideoPublishCycle.value = false;
};
const checkedVideoPublishCyclesChange = (value: string[]) => {
  const checkedCount = value.length;
  checkAllVideoPublishCycle.value = checkedCount === videoPublishCycles.length;
  isIndeterminateVideoPublishCycle.value =
    checkedCount > 0 && checkedCount < videoPublishCycles.length;
};
// from 全选 复选 E --------------------------------

// 展开/闭合 设置预警数据范围
const open = ref(false);
const openChange = () => {
  open.value = !open.value;
};

// 推送到钉钉 ---------------
// 钉钉手机号
const dingDingPhone = ref("");

// 覆盖范围
const coverRange = ref("1公里");
const coverRangeList = [
  {
    label: "1公里",
    radius: 1000,
    zoom: 14
  },
  {
    label: "5公里",
    radius: 5000,
    zoom: 13
  },
  {
    label: "10公里",
    radius: 10000,
    zoom: 12
  },
  {
    label: "30公里",
    radius: 30000,
    zoom: 10
  },
  {
    label: "50公里",
    radius: 50000,
    zoom: 9
  }
];
const coverRangeChange = val => {
  coverRange.value = val.label;
  mapForm.value.radius = val.radius;
  mapForm.value.zoom = val.zoom;
};
const mapForm = ref({
  zoom: 14,
  center: [120.211503, 30.209629],
  radius: 1000
});
// 全屏设置
const fullScreen = ref(false);
const fullScreenChange = () => {
  fullScreen.value = !fullScreen.value;
};
</script>

<template>
  <div class="add_emergency">
    <header>新建突发事件区域采集</header>
    <div class="add_emergency_form">
      <!--   任务启用   -->
      <div class="form_top">
        <div class="title">任务启用</div>
      </div>
      <!--   突发事件任务名称   -->
      <div class="item">
        <span>突发事件任务名称</span>
        <el-input v-model="addEmergencyFrom.taskName" />
      </div>
      <!--   开始结束时间   -->
      <div class="item">
        <span>开始时间</span>
        <el-date-picker
          v-model="addEmergencyFrom.startTime"
          type="datetime"
          placeholder="请选择开始时间"
        />
        <span style="margin-left: 100px">结束时间</span>
        <el-date-picker
          v-model="addEmergencyFrom.endTime"
          type="datetime"
          placeholder="请选择开始时间"
        />
      </div>
      <!--   设置预警数据范围   -->
      <div class="form_top">
        <div class="title">
          <div>设置预警数据范围<span>（可选项）</span></div>
          <span class="open" @click="openChange">{{
            open ? "闭合" : "展开"
          }}</span>
        </div>
      </div>
      <div class="set_warning" :class="{ closed: !open }">
        <!--   过滤来自同城   -->
        <div class="item">
          <span>过滤来自同城</span>
          <el-switch
            v-model="addEmergencyFrom.filterSameCity"
            inline-prompt
            active-text="ON"
            inactive-text="OFF"
          />
          <el-checkbox
            style="margin-right: 15px"
            v-model="checkAllSameCity"
            :indeterminate="isIndeterminate"
            @change="checkAllSameCityChange"
            >全部属地同城
          </el-checkbox>
          <el-checkbox-group
            v-model="addEmergencyFrom.sameCityList"
            @change="checkedCitiesChange"
          >
            <el-checkbox v-for="city in cities" :key="city" :label="city"
              >{{ city }}
            </el-checkbox>
          </el-checkbox-group>
          <el-button style="margin-left: 15px">添加同城</el-button>
        </div>
        <!--   过滤来自用户组   -->
        <div class="item">
          <span>过滤来自用户组</span>
          <el-switch
            v-model="addEmergencyFrom.filterUserGroup"
            inline-prompt
            active-text="ON"
            inactive-text="OFF"
          />
          <el-checkbox
            style="margin-right: 15px"
            v-model="checkAllUserGroup"
            :indeterminate="isIndeterminateUserGroup"
            @change="checkAllUserGroupChange"
            >全部分组
          </el-checkbox>
          <el-checkbox-group
            v-model="addEmergencyFrom.userGroupList"
            @change="checkedUserGroupsChange"
          >
            <el-checkbox
              v-for="groups in userGroups"
              :key="groups"
              :label="groups"
              >{{ groups }}
            </el-checkbox>
          </el-checkbox-group>
        </div>
        <!--   视频发布周期   -->
        <div class="item">
          <span>视频发布周期</span>
          <el-switch
            v-model="addEmergencyFrom.videoPublishCycle"
            inline-prompt
            active-text="ON"
            inactive-text="OFF"
          />
          <el-checkbox
            v-model="checkAllVideoPublishCycle"
            :indeterminate="isIndeterminateVideoPublishCycle"
            @change="checkAllVideoPublishCycleChange"
            >全部分组
          </el-checkbox>
          <el-checkbox-group
            v-model="addEmergencyFrom.videoPublishCycleList"
            @change="checkedVideoPublishCyclesChange"
          >
            <el-checkbox
              v-for="time in videoPublishCycles"
              :key="time"
              :label="time"
              >{{ time }}
            </el-checkbox>
          </el-checkbox-group>
          <el-checkbox class="ml-8" v-model="isCustomVideoPublishCycle">
            自定义
          </el-checkbox>
        </div>
      </div>
      <!--   设置采集区域范围   -->
      <div class="form_top">
        <div class="title">
          <div>设置采集区域范围</div>
        </div>
      </div>
      <div class="item">
        <div class="flex-1">
          <div class="flex-bc">
            <div class="coverage">
              覆盖范围:
              <span
                :class="{ active: coverRange === item.label }"
                @click="coverRangeChange(item)"
                v-for="item in coverRangeList"
                :key="item"
                >{{ item.label }}</span
              >
            </div>
            <a
              class="is_link text-sm"
              href="javascript:void(0);"
              @click="fullScreenChange"
              >全屏设置</a
            >
          </div>
          <div
            class="map flex-c bg-slate-200 my-3"
            :class="{ full_screen: fullScreen }"
          >
            <!--      地图      -->
            <my-map :item="mapForm" draggable editable />
            <!--      全屏状态下显示      -->
            <el-button v-show="fullScreen" @click="fullScreenChange"
              >退出全屏
            </el-button>
          </div>
          <p class="text-sm">
            设好范围后移动坐标进行定位，注意：大致估算事件波及范围，区域越小越精准
          </p>
          <p class="text-sm mt-2.5">
            <strong
              >经度 {{ mapForm.center[0] }} 维度 {{ mapForm.center[1] }}</strong
            >
          </p>
        </div>
      </div>
      <!--   设置采集关键词   -->
      <div class="form_top">
        <div class="title">
          <div>设置采集关键词<span>（可选项）</span></div>
        </div>
      </div>
      <div class="item">
        <span>关键词</span>
        <div class="item_l">
          <el-input v-model="addEmergencyFrom.keyword" />
          <i><strong>·</strong> 填一个词或组合词，等同于在抖音内搜索</i>
        </div>
      </div>
      <div class="item">
        <i class="add_words">添加词</i>
      </div>
      <!--   设置预警命中规则   -->
      <div class="form_top">
        <div class="title">
          <div>设置预警命中规则<span>（可选项）</span></div>
        </div>
      </div>
      <div class="item">
        <span>匹配模式</span>
        <div class="match_the_pattern">
          <el-button
            :type="addEmergencyFrom.matchMode === '1' ? 'primary' : ''"
            @click="addEmergencyFrom.matchMode = '1'"
            >简单模式
          </el-button>
          <el-button
            :type="addEmergencyFrom.matchMode === '2' ? 'primary' : ''"
            @click="addEmergencyFrom.matchMode = '2'"
            >高级模式
          </el-button>
        </div>
      </div>
      <div class="item">
        <span> 关键词 或 </span>
        <div class="item_l">
          <el-input
            class="one"
            v-model="addEmergencyFrom.keywordOr"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8 }"
          />
          <div class="prompt">
            <p style="color: red"><i>·</i> 必填</p>
            <p><i>·</i> 出一行就命中</p>
            <p><i>·</i> 一行一个，最多支持500个</p>
            <p><i>·</i> <span>命中词预览</span></p>
          </div>
        </div>
      </div>
      <div class="item">
        <span>与1</span>
        <div class="item_l">
          <el-input
            class="two"
            v-model="addEmergencyFrom.keywordAnd1"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8 }"
          />
          <div class="prompt">
            <p><i>·</i> 同时出现时命中</p>
          </div>
        </div>
      </div>
      <div class="item">
        <span>与2</span>
        <div class="item_l">
          <el-input
            class="two"
            v-model="addEmergencyFrom.keywordAnd2"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8 }"
          />
          <div class="prompt">
            <p><i>·</i> 同时出现时命中</p>
          </div>
        </div>
      </div>
      <div class="item">
        <span>非</span>
        <div class="item_l">
          <el-input
            class="three"
            v-model="addEmergencyFrom.keywordNot"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8 }"
          />
          <div class="prompt">
            <p><i>·</i> 排除关键词</p>
          </div>
        </div>
      </div>
      <!--   开启推送   -->
      <div class="form_top">
        <div class="title">
          <div>
            开启推送
            <el-switch
              class="ml-16"
              v-model="addEmergencyFrom.openPush"
              inline-prompt
              active-text="ON"
              inactive-text="OFF"
            />
          </div>
        </div>
      </div>
      <div class="item" v-show="addEmergencyFrom.openPush">
        <span>推送到</span>
        <div class="item_l">
          <div class="dingding">
            <el-checkbox
              v-model="addEmergencyFrom.pushToDingDing"
              label="钉钉群消息"
            />
            <div class="ding_content" v-show="addEmergencyFrom.pushToDingDing">
              <h4>请完成以下步骤</h4>
              <p>1.请输入接收通知消息的钉钉账号注册手机号，当有消息将@您</p>
              <el-input v-model="dingDingPhone" placeholder="请输入手机号" />
              <p>2.点击“发送验证码”按钮，将发送验证码到您的手机</p>
              <div class="qr_code">
                <div>暂未设置</div>
                <div>请联系支撑人员设置</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="item" v-show="addEmergencyFrom.openPush">
        <span>推送间隔</span>
        <div class="item_l">
          <el-radio-group v-model="addEmergencyFrom.pushInterval">
            <el-radio label="1">立即</el-radio>
            <el-radio label="2">1小时</el-radio>
            <el-radio label="3">6小时</el-radio>
            <el-radio label="4">24小时</el-radio>
          </el-radio-group>
        </div>
      </div>
      <div class="form_top" />
      <div class="item">
        <div class="ml-44">
          <el-button type="primary">保存</el-button>
          <el-button class="ml-16">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add_emergency {
  background: #fff;

  header {
    padding: 30px 0 0 45px;
    border-bottom: 1px solid #f0f0f0;
    line-height: 40px;
    font-weight: 700;
    font-size: 30px;
    color: #1f6bdf;
  }

  &_form {
    margin: 0 45px 45px 45px;
    padding-bottom: 50px;

    > div {
      margin-left: 120px;
    }

    .set_warning {
      margin-left: 0;
    }

    // 闭合
    .closed {
      display: none;
    }

    .item {
      display: flex;
      margin: 5px 0 25px 120px;

      span {
        margin-right: 20px;
        width: 170px;
        font-size: 20px;
      }

      .el-input {
        width: calc(100% - 190px);
      }

      .el-switch {
        margin-right: 30px;
      }

      &_l {
        display: flex;
        align-items: center;
        flex: 1;

        .el-input,
        .el-textarea {
          width: 60%;
        }

        .one {
          ::v-deep(.el-textarea__inner) {
            background: #e6f7ff;
          }
        }

        .two {
          ::v-deep(.el-textarea__inner) {
            background: #f6ffed;
          }
        }

        .three {
          ::v-deep(.el-textarea__inner) {
            background: #fffbe6;
          }
        }

        i {
          margin-left: 10px;
          font-size: 12px;
          color: #8c8c8c;
        }

        .prompt {
          font-size: 12px;
          color: #8c8c8c;

          span {
            cursor: pointer;
            font-size: 12px;
            color: #1890ff;
          }

          i {
            font-weight: 700;
            color: red;
          }
        }

        .dingding {
          width: 100%;

          .ding_content {
            padding: 40px;
            border: 1px solid #d9d9d9;
            width: 60%;

            p {
              margin-top: 10px;
              font-size: 14px;
            }

            .qr_code {
              //  多行文本居中显示
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width: 230px;
              height: 230px;
              background: #f0f0f0;
              font-size: 14px;
              color: #595959;
            }
          }
        }
      }

      .add_words {
        margin-left: 170px;
        cursor: pointer;
        font-weight: 700;
        font-size: 14px;
        color: #1890ff;
      }

      .match_the_pattern {
        display: flex;
        align-items: center;

        .el-input {
          margin: 0;
          font-size: 14px;
        }

        .el-button + .el-button {
          margin-left: 0;
        }
      }
    }

    .form_top {
      margin-top: 50px;
      margin-bottom: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #f0f0f0;
      line-height: 32px;

      .title {
        display: flex;
        justify-content: space-between;
        font-weight: 700;
        font-size: 24px;
        color: #000;

        span {
          color: #bfbfbf;
        }

        .open {
          cursor: pointer;
          font-size: 14px;
          color: #8c8c8c;
        }
      }
    }
  }

  .coverage {
    span {
      margin: 1px;
      padding: 2px 10px;
      border: 1px solid #d9d9d9;
      font-size: 14px;
      color: #000;
    }

    .active {
      background: #1890ff;
      color: #fff;
    }
  }

  .map {
    height: 631px;

    .el-button {
      position: absolute;
      right: 10px;
      top: 50px;
      z-index: 3333333;
    }
  }

  .full_screen {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
    width: 100vw;
    height: 100vh;
  }
}
</style>
