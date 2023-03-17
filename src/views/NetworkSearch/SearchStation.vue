<script lang="ts" setup>
import { ListType } from "@/types/data";
import { useSearchTabs } from "@/store/modules/searchTabs";
import RefreshRight from "@iconify-icons/ep/refresh-right";
import Search from "@iconify-icons/ep/search";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import {
  ELIMINATE_THE_HAZARD,
  FILTER_INCOMING_TIME,
  FILTER_PUB_TIME_LIST,
  SORT_LIST,
  SOURCE_PLATFORM,
  STATUS_OPTIONS
} from "@/utils/enum";
import MyFavorites from "@/components/MyFavorites.vue";
import CardItem from "@/layout/components/CardCom/CardItem.vue";
defineOptions({
  name: "SearchStation"
});
const netSearchList = ref<ListType[]>([]);
for (let i = 0; i < 30; i++) {
  const newItem: ListType = {
    url: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200/200`,
    title: `Title ${i + 1}`,
    loading: Math.random() >= 0.5,
    avatar: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/50/50`,
    name: `User ${i + 1}`,
    dianzan: Math.floor(Math.random() * 100),
    pinglun: Math.floor(Math.random() * 100),
    zhuanfa: Math.floor(Math.random() * 100),
    time: "2023-03-09 10:42:34",
    favoriteStatus: Math.random() >= 0.5,
    id: Math.floor(Math.random() * 100),
    check: Math.random() >= 0.5
  };
  netSearchList.value.push(newItem);
}
const useSearchTab = useSearchTabs();
// 是否全选
const selectAll = computed({
  get: () => netSearchList.value.every(item => item.check),
  set: val => {
    netSearchList.value.forEach(item => {
      item.check = val;
    });
  }
});
const router = useRouter();
// 返回上一级
const goBack = () => {
  router.push("/networkSearch/hot");
};
// 去搜索全网页面
const goSearchNet = () => {
  router.push("/networkSearch/network");
};

const stationFrom = ref({
  keyWord: "",
  accountNumber: "",
  videoId: "",
  status: "1",
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
// 全选全部同城属地
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

// 过滤发布时间
const filterPubTimeList = FILTER_PUB_TIME_LIST;
// 过滤入库时间
const filterIncomingTime = FILTER_INCOMING_TIME;
// 来源平台
const sourcePlatform = SOURCE_PLATFORM;
// 排除危害 eliminateTheHazard
const eliminateTheHazard = ELIMINATE_THE_HAZARD;

// 全选规则
const allRules = ref(false);
// 规则列表
const ruleList = ["规则1", "规则2"];
// 设置不确定状态，仅负责样式控制
const isIndeterminate2 = ref(true);
const handleCheckAllChange2 = (val: boolean) => {
  stationFrom.value.checkedRule = val ? ruleList : [];
  isIndeterminate2.value = false;
};
const handleCheckedCitiesChange2 = (value: string[]) => {
  const checkedCount = value.length;
  allRules.value = checkedCount === ruleList.length;
  isIndeterminate2.value = checkedCount > 0 && checkedCount < ruleList.length;
};

// 排序
const sortList = SORT_LIST;
// 当前排序规则
const curSort = ref("1");
</script>

<template>
  <div>
    <my-favorites />
    <!--  标题  -->
    <div class="station_title">
      搜全站已入库视频
      <div class="back">
        <span @click="goBack">返回</span>
        <i>|</i>
        <span @click="goSearchNet">搜全网</span>
      </div>
    </div>
    <!--  from  -->
    <div class="station_from">
      <div class="station_from_first">
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
      <div class="station_from_two">
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
      <div class="station_from_three">
        <p>过滤发布时间</p>
        <span
          :class="{ active: stationFrom.filterPub === item.value }"
          v-for="item in filterPubTimeList"
          :key="item.value"
          @click="stationFrom.filterPub = item.value"
          >{{ item.label }}</span
        >
        <div>过滤入库时间</div>
        <span
          :class="{ active: stationFrom.filterIncoming === item.value }"
          v-for="item in filterIncomingTime"
          :key="item.value"
          @click="stationFrom.filterIncoming = item.value"
          >{{ item.label }}</span
        >
      </div>
      <div class="station_from_four">
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
            :indeterminate="isIndeterminate2"
            @change="handleCheckAllChange2"
            >全部</el-checkbox
          >
          <el-checkbox-group
            v-model="stationFrom.checkedRule"
            @change="handleCheckedCitiesChange2"
          >
            <el-checkbox v-for="city in ruleList" :key="city" :label="city">{{
              city
            }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <el-divider />
      <div class="station_from_search">
        <el-button><IconifyIconOffline :icon="Search" />搜索</el-button>
        <span>导出</span>
      </div>
      <div class="station_from_sort">
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
    <!--  内容区域  -->
    <div class="search_station">
      <div class="top_loading">
        <div class="top_loading_l">
          <span class="loader" style="margin-right: 10px" />
          <span>正在从已入库视频中检索到 <i>9999</i></span>
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
          <el-checkbox v-model="selectAll" label="全选" size="large" />
          <el-button>将勾选结果添加到任务...</el-button>
        </div>
      </div>
      <el-row :gutter="30">
        <el-col :span="4" v-if="!useSearchTab.endOfCountdown">
          <el-skeleton animated>
            <template #template>
              <el-skeleton-item
                variant="image"
                style="width: 100%; height: 380px"
              />
              <div>
                <el-skeleton-item variant="p" style="width: 80%" />
                <el-skeleton-item variant="p" style="width: 80%" />
                <el-skeleton-item variant="p" style="width: 60%" />
              </div>
            </template>
          </el-skeleton>
        </el-col>
        <el-col :span="4" v-for="item in netSearchList" :key="item.id">
          <card-item :item="item" :hasCheck="true" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.station_title {
  color: #fff;
  background: #595959;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
  padding: 14px 0;
  position: relative;

  .back {
    position: absolute;
    left: 24px;
    top: 14px;
    font-size: 14px;

    span {
      cursor: pointer;
    }

    i {
      color: #fff;
      margin: 0 10px;
    }
  }
}

.station_from {
  background: #f5f5f5;
  padding: 20px 35px;
  color: #595959;

  div {
    display: flex;
    align-items: center;
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

    span {
      font-size: 14px;
      color: #595959;
      cursor: pointer;
      margin-left: 20px;
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

.search_station {
  padding: 25px 30px 220px;
  background: #fff;

  .top_loading {
    background: #f6ffed;
    border: 1px solid #b7eb8f;
    margin-bottom: 32px;
    padding: 10px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
      display: flex;
      align-items: center;
    }

    &_c {
      font-size: 14px;

      .el-button {
        width: 334px;
        height: 43px;
        background: #1890ff;
        border-radius: 30px;
        color: #fff;
      }
    }

    &_r {
      font-size: 14px;

      .el-button {
        color: #fff;
        padding: 0 7px;
        margin-left: 15px;
        width: 166px;
        height: 22px;
        background: #1890ff;
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.043);
        border-radius: 2px;
      }
    }
  }
}

i {
  color: #1890ff;
}
</style>
