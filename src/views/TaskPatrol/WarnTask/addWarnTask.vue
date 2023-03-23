<script lang="ts" setup>
import { ref } from "vue";

defineOptions({
  name: "addWarnTask"
});
const addWarnTaskFrom = ref({
  //   任务名称
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
  addWarnTaskFrom.value.sameCityList = val ? cities : [];
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
  addWarnTaskFrom.value.userGroupList = val ? userGroups : [];
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
  addWarnTaskFrom.value.videoPublishCycleList = val ? videoPublishCycles : [];
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
</script>

<template>
  <div class="add_warn_task">
    <header>新建预警任务</header>
    <div class="add_warn_task_form">
      <!--   任务启用   -->
      <div class="form_top">
        <div class="title">任务启用</div>
      </div>
      <!--   任务名称   -->
      <div class="item">
        <span>任务名称</span>
        <el-input v-model="addWarnTaskFrom.taskName" />
      </div>
      <!--   开始结束时间   -->
      <div class="item">
        <span>开始时间</span>
        <el-date-picker
          v-model="addWarnTaskFrom.startTime"
          type="datetime"
          placeholder="请选择开始时间"
        />
        <span style="margin-left: 100px">结束时间</span>
        <el-date-picker
          v-model="addWarnTaskFrom.endTime"
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
            v-model="addWarnTaskFrom.filterSameCity"
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
            v-model="addWarnTaskFrom.sameCityList"
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
            v-model="addWarnTaskFrom.filterUserGroup"
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
            v-model="addWarnTaskFrom.userGroupList"
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
            v-model="addWarnTaskFrom.videoPublishCycle"
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
            v-model="addWarnTaskFrom.videoPublishCycleList"
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
      <!--   设置预警数据范围   -->
      <div class="form_top">
        <div class="title">
          <div>设置预警数据范围<span>（可选项）</span></div>
        </div>
      </div>
      <div class="item">
        <span>关键词</span>
        <div class="item_l">
          <el-input v-model="addWarnTaskFrom.keyword" />
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
            :type="addWarnTaskFrom.matchMode === '1' ? 'primary' : ''"
            @click="addWarnTaskFrom.matchMode = '1'"
            >简单模式
          </el-button>
          <el-button
            :type="addWarnTaskFrom.matchMode === '2' ? 'primary' : ''"
            @click="addWarnTaskFrom.matchMode = '2'"
            >高级模式
          </el-button>
        </div>
      </div>
      <div class="item">
        <span> 关键词 或 </span>
        <div class="item_l">
          <el-input
            class="one"
            v-model="addWarnTaskFrom.keywordOr"
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
            v-model="addWarnTaskFrom.keywordAnd1"
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
            v-model="addWarnTaskFrom.keywordAnd2"
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
            v-model="addWarnTaskFrom.keywordNot"
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
              v-model="addWarnTaskFrom.openPush"
              inline-prompt
              active-text="ON"
              inactive-text="OFF"
            />
          </div>
        </div>
      </div>
      <div class="item" v-show="addWarnTaskFrom.openPush">
        <span>推送到</span>
        <div class="item_l">
          <div class="dingding">
            <el-checkbox
              v-model="addWarnTaskFrom.pushToDingDing"
              label="钉钉群消息"
            />
            <div class="ding_content" v-show="addWarnTaskFrom.pushToDingDing">
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
      <div class="item" v-show="addWarnTaskFrom.openPush">
        <span>推送间隔</span>
        <div class="item_l">
          <el-radio-group v-model="addWarnTaskFrom.pushInterval">
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
.add_warn_task {
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
        width: 150px;
        font-size: 20px;
      }

      .el-input {
        width: calc(100% - 170px);
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
}
</style>
