<script setup lang="ts">
import { onMounted, ref } from "vue";
import Plus from "@iconify-icons/ep/plus";
import Setting from "@iconify-icons/ri/settings-3-line";
import Search from "@iconify-icons/ep/search";
import RefreshRight from "@iconify-icons/ep/refresh-right";

import {
  ELIMINATE_THE_HAZARD,
  FILTER_INCOMING_TIME,
  FILTER_PUB_TIME_LIST,
  SORT_LIST,
  SOURCE_PLATFORM,
  STATUS_OPTIONS
} from "@/utils/enum";
import CardSkeleton from "@/layout/components/CardCom/CardSkeleton.vue";
import { ListType } from "@/types/data";
import CardItem from "@/layout/components/CardCom/CardItem.vue";
defineOptions({
  name: "TaskPatrol"
});

const editableTabsValue = ref("1");
const editableTabs = ref([
  {
    title: "全部任务",
    name: "1",
    content: "Tab 1 content"
  },
  {
    title: "Tab 1",
    name: "2",
    content: "Tab 2 content"
  },
  {
    title: "Tab 2",
    name: "3",
    content: "Tab 2 content"
  }
]);

const removeTab = (targetName: string) => {
  const tabs = editableTabs.value;
  let activeName = editableTabsValue.value;
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.name;
        }
      }
    });
  }

  editableTabsValue.value = activeName;
  editableTabs.value = tabs.filter(tab => tab.name !== targetName);
};

const stationFrom = ref({
  keyWord: "",
  accountNumber: "",
  videoId: "",
  status: "1",
  // 过滤任务
  filterTasks: true,
  // 选中的过滤任务
  checkedTasks: ["任务2"],
  // 过滤用户
  filterUsers: true,
  // 选中的过滤用户
  checkedUsers: ["组1"],
  // 过滤同城
  filterCity: true,
  // 选中的同城属地
  checkedCities: ["同城1"],
  // 过滤发布时间
  filterPub: "1",
  // 过滤入库时间
  filterIncoming: "1",
  // 来源平台
  platform: "1",
  // 排除危害
  harm: "1",
  // 选中的规则,
  checkedRule: ["规则1"]
});
// 认证选项
const statusOptions = STATUS_OPTIONS;

// -------- 全选过滤任务 S --------
const allFilterTasks = ref(false);
// 设置不确定状态，仅负责样式控制
const isIndeterminateTask = ref(true);
// 过滤任务列表
const taskList = ["任务1", "任务2"];
// 全选或者取消全选过滤任务
const checkAllTask = (val: boolean) => {
  stationFrom.value.checkedTasks = val ? taskList : [];
  isIndeterminateTask.value = false;
};
// 判断是否取消全选过滤任务
const checkedTask = (value: string[]) => {
  const checkedCount = value.length;
  allFilterTasks.value = checkedCount === taskList.length;
  isIndeterminateTask.value =
    checkedCount > 0 && checkedCount < taskList.length;
};
// -------- 全选过滤任务 E --------

// -------- 全选过滤用户 S --------
const allFilterUser = ref(false);
// 设置不确定状态，仅负责样式控制
const isIndeterminateUser = ref(true);
// 过滤任务列表
const userList = ["组1", "组2"];
// 全选或者取消全选过滤用户
const checkAllUser = (val: boolean) => {
  stationFrom.value.checkedTasks = val ? userList : [];
  isIndeterminateUser.value = false;
};
// 判断是否取消全选过滤用户
const checkedUser = (value: string[]) => {
  const checkedCount = value.length;
  allFilterUser.value = checkedCount === userList.length;
  isIndeterminateUser.value =
    checkedCount > 0 && checkedCount < userList.length;
};
// -------- 全选过滤用户 E --------

// -------- 全选全部同城属地 S --------
const checkAll = ref(false);
// 设置不确定状态，仅负责样式控制
const isIndeterminate = ref(true);
// 同城属地列表
const cities = ["同城1", "同城2"];

// 是否全部属地同城
const handleCheckAllChange = (val: boolean) => {
  stationFrom.value.checkedCities = val ? cities : [];
  isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === cities.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length;
};
// -------- 全选全部同城属地 E --------

// 过滤发布时间
const filterPubTimeList = FILTER_PUB_TIME_LIST;
// 过滤入库时间
const filterIncomingTime = FILTER_INCOMING_TIME;
// 来源平台
const sourcePlatform = SOURCE_PLATFORM;
// 排除危害 eliminateTheHazard
const eliminateTheHazard = ELIMINATE_THE_HAZARD;

// -------- 全选规则 S --------
const allRules = ref(false);
// 规则列表
const ruleList = ["规则1", "规则2"];
// 设置不确定状态，仅负责样式控制
const isIndeterminateRule = ref(true);
const checkAllRule = (val: boolean) => {
  stationFrom.value.checkedRule = val ? ruleList : [];
  isIndeterminateRule.value = false;
};
const checkedRule = (value: string[]) => {
  const checkedCount = value.length;
  allRules.value = checkedCount === ruleList.length;
  isIndeterminateRule.value =
    checkedCount > 0 && checkedCount < ruleList.length;
};
// -------- 全选规则 E --------

// 常用搜索列表
const commonSearchList = ref(["名称1", "名称2"]);

// 排序
const sortList = SORT_LIST;
// 当前排序规则
const curSort = ref("1");

// 控制展开闭合
const isOpenCard = ref(true);

// 本页全部已读
const allPageRead = () => {
  // 调本页已读接口
  netSearchList.value.forEach(item => {
    item.readStatus = true;
  });
};
// 全部标记已读
const allMarkRead = () => {
  // 调全部已读接口
  netSearchList.value.forEach(item => {
    item.readStatus = true;
  });
};
// 全部删除
// 所有标记已读
// Card 区域
const netSearchList = ref<ListType[]>([]);
const getTaskList = () => {
  for (let i = 0; i < 30; i++) {
    const newItem: ListType = {
      url: `https://picsum.photos/id/${Math.floor(
        Math.random() * 100
      )}/200/200`,
      title: `Title ${i + 1}`,
      loading: Math.random() >= 0.5,
      avatar: `https://picsum.photos/id/${Math.floor(
        Math.random() * 100
      )}/50/50`,
      name: `User ${i + 1}`,
      dianzan: Math.floor(Math.random() * 100),
      pinglun: Math.floor(Math.random() * 100),
      zhuanfa: Math.floor(Math.random() * 100),
      time: "2023-03-09 10:42:34",
      favoriteStatus: Math.random() >= 0.5,
      id: Math.floor(Math.random()),
      check: Math.random() >= 0.5,
      taskList: [
        `#${Math.floor(Math.random() * 1000)}任务`,
        `#${Math.floor(Math.random() * 1000)}任务`
      ],
      readStatus: Math.random() >= 0.5,
      keywords: [
        `${Math.floor(Math.random() * 1000)}词`,
        `${Math.floor(Math.random() * 1000)}词`
      ]
    };
    netSearchList.value.push(newItem);
  }
};
onMounted(() => {
  getTaskList();
});
</script>

<template>
  <div class="task">
    <el-tabs
      v-model="editableTabsValue"
      type="card"
      class="demo-tabs"
      @tab-remove="removeTab"
    >
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <div class="task_patrol">
          <div class="task_patrol_first" :class="{ no_open: isOpenCard }">
            <div>
              <span>关键词</span> <el-input v-model="stationFrom.keyWord" />
            </div>
            <div>
              <span>帐号</span> <el-input v-model="stationFrom.accountNumber" />
            </div>
            <div>
              <span>视频ID</span> <el-input v-model="stationFrom.videoId" />
            </div>
            <div>
              <span>认证状态</span>
              <el-select
                v-model="stationFrom.status"
                class="m-2"
                placeholder="Select"
                size="default"
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
          <div class="task_patrol_two" :class="{ no_open: isOpenCard }">
            过滤任务
            <el-switch
              v-model="stationFrom.filterTasks"
              inline-prompt
              active-text="是"
              inactive-text="否"
            />
            <el-checkbox
              v-model="allFilterTasks"
              :indeterminate="isIndeterminateTask"
              @change="checkAllTask"
              >全部</el-checkbox
            >
            <el-checkbox-group
              v-model="stationFrom.checkedTasks"
              @change="checkedTask"
            >
              <el-checkbox v-for="task in taskList" :key="task" :label="task">{{
                task
              }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="task_patrol_two" :class="{ no_open: isOpenCard }">
            过滤同城
            <el-switch
              v-model="stationFrom.filterCity"
              inline-prompt
              active-text="是"
              inactive-text="否"
            />
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
              >全部属地同城</el-checkbox
            >
            <el-checkbox-group
              v-model="stationFrom.checkedCities"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox v-for="city in cities" :key="city" :label="city">{{
                city
              }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="task_patrol_two" :class="{ no_open: isOpenCard }">
            过滤用户
            <el-switch
              v-model="stationFrom.filterUsers"
              inline-prompt
              active-text="是"
              inactive-text="否"
            />
            <el-checkbox
              v-model="allFilterUser"
              :indeterminate="isIndeterminateUser"
              @change="checkAllUser"
              >全部</el-checkbox
            >
            <el-checkbox-group
              v-model="stationFrom.checkedUsers"
              @change="checkedUser"
            >
              <el-checkbox v-for="task in userList" :key="task" :label="task">{{
                task
              }}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="task_patrol_three" :class="{ no_open: isOpenCard }">
            <p>发布时间</p>
            <span
              :class="{ active: stationFrom.filterPub === item.value }"
              v-for="item in filterPubTimeList"
              :key="item.value"
              @click="stationFrom.filterPub = item.value"
              >{{ item.label }}</span
            >
            <div>入库时间</div>
            <span
              :class="{ active: stationFrom.filterIncoming === item.value }"
              v-for="item in filterIncomingTime"
              :key="item.value"
              @click="stationFrom.filterIncoming = item.value"
              >{{ item.label }}</span
            >
          </div>
          <div class="task_patrol_four" :class="{ no_open: isOpenCard }">
            <div>
              <span>来源平台</span>
              <el-select
                v-model="stationFrom.platform"
                class="m-2"
                placeholder="Select"
                size="default"
              >
                <el-option
                  v-for="item in sourcePlatform"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div>
              <span>排除危害</span>
              <el-select
                v-model="stationFrom.harm"
                class="m-2"
                placeholder="Select"
                size="default"
              >
                <el-option
                  v-for="item in eliminateTheHazard"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
            <div>
              <el-checkbox
                v-model="allRules"
                :indeterminate="isIndeterminateRule"
                @change="checkAllRule"
                >全部</el-checkbox
              >
              <el-checkbox-group
                v-model="stationFrom.checkedRule"
                @change="checkedRule"
              >
                <el-checkbox
                  v-for="city in ruleList"
                  :key="city"
                  :label="city"
                  >{{ city }}</el-checkbox
                >
              </el-checkbox-group>
            </div>
          </div>
          <div style="justify-content: right">
            <span @click="isOpenCard = !isOpenCard" style="cursor: pointer">{{
              isOpenCard ? "展开" : "闭合"
            }}</span>
          </div>
          <el-divider />
          <div class="task_patrol_search">
            <el-button><IconifyIconOffline :icon="Search" />搜索</el-button>
            <span>分析报告</span> | <span>导出</span> |
            <span>保存为常用</span>
            <div class="common_search">
              <span>常用搜索:</span>
              <el-tag v-for="tag in commonSearchList" :key="tag" closable>
                {{ tag }}
              </el-tag>
            </div>
          </div>
          <div class="task_patrol_sort">
            <p>排序:</p>
            <span
              :class="{ active: curSort === item.value }"
              v-for="item in sortList"
              :key="item.value"
              @click="curSort = item.value"
              >{{ item.label }}</span
            >
          </div>
        </div>
        <div class="task_patrol_body">
          <div class="top_loading">
            <div class="top_loading_l">
              <span class="loader" style="margin-right: 10px" />
              <span>从当前任务中搜索到 <i>9999</i></span>
            </div>
            <div class="top_loading_c">
              <el-button>
                <IconifyIconOffline
                  :icon="RefreshRight"
                  style="font-size: 18px; margin-right: 10px"
                />
                新检索到<span>999</span>条，点击加载
              </el-button>
            </div>
            <div class="top_loading_r">
              <el-button @click="allPageRead">将本页全部标为已读</el-button>
              <el-button
                @click="allMarkRead"
                style="width: 110px; background: #fff; color: #000"
                >将所有标为已读</el-button
              >
            </div>
          </div>
          <el-row :gutter="30">
            <el-col :span="4"> <card-skeleton /> </el-col>
            <el-col :span="4" v-for="item in netSearchList" :key="item.id">
              <card-item :item="item" />
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane name="add">
        <template #label>
          <div class="custom-tabs-label">
            <span><IconifyIconOffline :icon="Plus" /> 新建任务</span>
          </div>
        </template>
        Route
      </el-tab-pane>
      <el-tab-pane name="manage">
        <template #label>
          <div class="custom-tabs-label">
            <span><IconifyIconOffline :icon="Setting" /> 管理任务</span>
          </div>
        </template>
        Route
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.task {
  background: #fff;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

::v-deep(.el-tabs__header) {
  background: #d9d9d9;
  padding: 15px 0 0 15px;
  margin: 0;
  height: 56px;

  .el-tabs__item {
    background: #fff;
  }
}

::v-deep(.el-tabs__nav) {
  display: flex;
}

.custom-tabs-label {
  span {
    display: flex;
    align-items: center;
  }

  svg {
    margin-right: 5px;
  }
}

.task_patrol {
  background: #f5f5f5;
  padding: 20px 35px;
  color: #595959;

  .no_open {
    opacity: 0;
    height: 0;
    margin: 3px 0;
  }

  div {
    display: flex;
    align-items: center;
    opacity: 1;
  }

  &_first {
    display: flex;
    align-items: center;
    margin-bottom: 5px;

    div {
      width: 25%;
      font-size: 16px;
      display: flex;
      align-items: center;

      .el-select,
      .el-input {
        flex: 1;
        margin-left: 5px;
      }

      &:nth-child(-n + 3) {
        margin-right: 30px;
      }
    }
  }

  &_two {
    margin: 10px 0;

    .el-switch {
      margin: 0 15px 0 10px;
    }

    .el-checkbox {
      margin: 0 15px;
    }
  }

  &_three {
    margin: 15px 0 8px 0;

    span {
      display: inline-block;
      width: 43px;
      height: 24px;
      text-align: center;
      margin: 0 5px;
      cursor: pointer;
    }

    .active {
      color: #fff;
      background: #1890ff;
      border-radius: 5px;
    }

    div {
      margin-left: 50px;
    }
  }

  &_four {
    div:first-child {
      margin-right: 30px;
    }

    div:nth-child(2) {
      margin-right: 10px;
    }

    .el-checkbox-group {
      .el-checkbox {
        margin: 0 0 0 15px;
      }
    }
  }

  .el-divider--horizontal {
    margin: 15px 0;
  }

  &_search {
    padding-left: 70px;

    .el-button {
      margin-right: 10px;
    }

    span {
      font-size: 14px;
      color: #595959;
      cursor: pointer;
      margin: 0 10px;
    }

    .common_search {
      font-weight: 700;
      font-size: 14px;
      color: #595959;
      margin-left: 20px;
      display: flex;
      align-items: center;
    }
  }

  &_sort {
    justify-content: right;

    p {
      font-size: 14px;
      color: #595959;
    }

    span {
      color: #1890ff;
      cursor: pointer;
      margin-left: 10px;
    }

    .active {
      color: #000;
    }
  }
}

.task_patrol_body {
  background: #fff;
  padding: 20px 30px 130px;
}
</style>
