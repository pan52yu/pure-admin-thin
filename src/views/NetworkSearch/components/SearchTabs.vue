<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import Search from "@iconify-icons/ep/search";
import { useRouter, useRoute } from "vue-router";
import { useSearchTabs } from "@/store/modules/searchTabs";
defineOptions({
  name: "SearchTabs"
});
interface TabType {
  name: string;
  icon: string;
  label: string;
}
// 三个tab 抖音 头条 快手
const tabList: TabType[] = [
  {
    name: "douYin",
    icon: "icon-douyin",
    label: "抖音"
  },
  {
    name: "touTiao",
    icon: "icon-toutiao",
    label: "头条"
  },
  {
    name: "kuaiShou",
    icon: "icon-kuaishou",
    label: "快手"
  }
];
const useSearchTab = useSearchTabs();
// 默认选中的是抖音
const activeName = ref("douYin");
// input绑定的值
const inputValue = ref(useSearchTab.searchLabs);
// 点击tab的事件
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
  if (timer.value !== null) {
    clearInterval(timer.value);
  }
  useSearchTab.setEndOfCountdown(true);
  countDown.value = 0;
};
// 过滤的值数组
const timeList = [
  "全部",
  "<6h",
  "<12h",
  "<1d",
  "<3d",
  "<7d",
  "<1m",
  "<3m",
  "<6m"
];
// 是否按时间倒序
const reverseTime = false;
// 用于高亮选中的过滤时间
const currentTime = ref(0);

const router = useRouter();
// 搜索
const search = () => {
  if (inputValue.value.trim() !== "") {
    if (route.path === "/networkSearch/hot") {
      router.push({
        name: "SearchResults"
      });
      useSearchTab.setSearchLabs(inputValue.value);
    } else {
      if (timer.value !== null) {
        clearInterval(timer.value);
      }
      timeDownFn();
    }
  }
};
const route = useRoute();

// 是否显示搜索框下面的时间过滤选项
const showFilterTime = computed(() => {
  return route.path !== "/networkSearch/hot";
});
// 倒计时
const countDown = ref(60);
const timer = ref(null);
// 倒计时开始
const timeDownFn = () => {
  countDown.value = 60;
  useSearchTab.setEndOfCountdown(false);
  timer.value = setInterval(() => {
    countDown.value--;
    if (countDown.value <= 0) {
      clearInterval(timer.value);
      useSearchTab.setEndOfCountdown(true);
    }
  }, 1000);
};

onMounted(() => {
  if (timer.value !== null) {
    clearInterval(timer.value);
  }
  timeDownFn();
});
onUnmounted(() => {
  clearInterval(timer.value);
});
</script>
<template>
  <div class="search_tabs">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <!-- tabs -->
      <el-tab-pane v-for="item in tabList" :key="item.name" :name="item.name">
        <template #label>
          <div :class="{ is_active_tabs: activeName === item.name }">
            <FontIcon :icon="item.icon" />
            {{ item.label }}
          </div>
        </template>
        <!-- input 搜索框 -->
        <el-input
          v-model="inputValue"
          @keyup.enter="search"
          clearable
          placeholder="请输入关键词搜索"
        >
          <template #suffix>
            <div
              class="ipt_suf"
              v-if="showFilterTime && !useSearchTab.endOfCountdown"
            >
              <span
                v-if="countDown !== 0"
                style="vertical-align: text-bottom"
                class="loader"
              />
              正在搜索... {{ countDown }}s
            </div>
            <font-icon
              v-else-if="showFilterTime && useSearchTab.endOfCountdown"
              style="color: #1ddb0d"
              icon="icon-duigou"
            />
          </template>
          <template #append>
            <div @click="search">
              <IconifyIconOffline :icon="Search" />
              搜索
            </div>
          </template>
        </el-input>
      </el-tab-pane>
      <!-- 过滤时间 -->
      <div v-show="showFilterTime" class="filter_time">
        <span>过滤发布时间</span>
        <span
          class="time"
          :class="{ active: currentTime === index }"
          @click="currentTime = index"
          v-for="(item, index) in timeList"
          :key="index"
        >
          {{ item }}
        </span>
        <el-checkbox v-model="reverseTime" label="按时间倒序" size="large" />
      </div>
    </el-tabs>
    <!-- 右上角三个状态 -->
    <div class="right_state">
      <div class="dy_state" />
      <div class="tt_state" />
      <div class="ks_state" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search_tabs {
  display: flex;
  justify-content: space-between;

  .demo-tabs {
    margin-top: 50px;

    .filter_time {
      padding-top: 20px;

      ::v-deep(.el-checkbox__label) {
        color: #ffffff;
      }

      .el-checkbox {
        margin-left: 15px;
      }
    }

    .time {
      margin-left: 15px;
      padding: 2px;
      width: 43px;
      height: 24px;
      cursor: pointer;

      &.active {
        border-radius: 5px;
        background: #1890ff;
      }
    }
  }

  .right_state {
    display: flex;
    margin: 17px 40px 0 0;

    div {
      box-sizing: border-box;
      margin-left: 3px;
      border-radius: 50%;
      width: 11px;
      height: 11px;
    }

    .dy_state {
      border: 2px solid #1ddb0d;
    }

    .tt_state {
      border: 2px solid #dbae0d;
    }

    .ks_state {
      border: 2px solid #bfbfbf;
    }
  }
}

::v-deep(.el-tabs__header) {
  margin: 0 0 5px;

  .el-tabs__item {
    padding: 0 15px;
    height: 28px;
    line-height: 22px;
    font-size: 14px;
    color: #ffffff;
  }
}

::v-deep(.el-tabs__active-bar) {
  width: 58px;
  height: 2px;
  background: #fa8c16;
}

::v-deep(.el-tabs__nav-wrap::after) {
  background-color: transparent;
}

.is_active_tabs {
  color: #fa8c16;
}

.el-input {
  width: 721px;
  height: 52px;
}

::v-deep(.el-input-group__append) {
  padding: 0;
  width: 95px;
  height: 100%;
  background: #fa8c16;
  color: #ffffff;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
}

.ipt_suf {
  height: 50px;
  line-height: 50px;

  ::v-deep(.el-loading-parent--relative) {
    margin-right: 20px;
  }

  ::v-deep(.circular) {
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }
}
</style>
