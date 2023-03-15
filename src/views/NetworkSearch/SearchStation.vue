<script lang="ts" setup>
import ItemCard from "@/views/NetworkSearch/components/ItemCard.vue";
import { ListType } from "@/types/data";
import { useSearchTabs } from "@/store/modules/searchTabs";
import RefreshRight from "@iconify-icons/ep/refresh-right";
import { useRouter } from "vue-router";
import { ref } from "vue";
defineOptions({
  name: "SearchStation"
});
const netSearchList: ListType[] = [];
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
    id: Math.floor(Math.random() * 100)
  };
  netSearchList.push(newItem);
}
const useSearchTab = useSearchTabs();
// 是否全选
const selectAll = false;

const router = useRouter();
// 返回上一级
const goBack = () => {
  router.back();
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
  filterCity: true,
  checkedCities: ["同城1"] // 选中的同城属地
});
// 认证选项
const statusOptions = [
  {
    label: "全部",
    value: "1"
  },
  {
    label: "已认证",
    value: "2"
  },
  {
    label: "未认证",
    value: "3"
  }
];

// 全选全部同城属地
const checkAll = ref(false);
// 设置不确定状态，仅负责样式控制
const isIndeterminate = ref(true);
// 同城属地列表
const cities = ["同城1", "同城2"];

const handleCheckAllChange = (val: boolean) => {
  stationFrom.value.checkedCities = val ? cities : [];
  isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === cities.length;
  isIndeterminate.value = checkedCount > 0 && checkedCount < cities.length;
};
</script>

<template>
  <div>
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
            size="large"
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
      <el-row :gutter="20">
        <el-col :span="4" v-if="!useSearchTab.endOfCountdown">
          <el-skeleton animated>
            <template #template>
              <el-skeleton-item
                variant="image"
                style="width: 200px; height: 250px"
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
          <item-card :item="item" />
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
</style>
