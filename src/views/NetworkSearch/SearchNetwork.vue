<script lang="ts" setup>
import TopBanner from "@/views/NetworkSearch/components/TopBanner.vue";
import { ListType } from "@/types/data";
import { useSearchTabs } from "@/store/modules/searchTabs";
import RefreshRight from "@iconify-icons/ep/refresh-right";
import { computed, ref } from "vue";
import MyFavorites from "@/components/MyFavorites.vue";
import { useRouter } from "vue-router";
import CardItem from "@/layout/components/CardCom/CardItem.vue";

defineOptions({
  name: "SearchNetwork"
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
// 去搜索全站页面
const goSearchNet = () => {
  router.push("/networkSearch/station");
};
</script>
<template>
  <div>
    <my-favorites />
    <div class="back">
      <span @click="goBack">返回</span>
      <i>|</i>
      <span @click="goSearchNet">搜全站</span>
    </div>
    <top-banner />
    <div class="search_network">
      <div class="top_loading">
        <div class="top_loading_l">
          <span class="loader" style="margin-right: 10px" />
          <span>正在全网实时搜索视频并入库 <i>22/99</i></span>
        </div>
        <div class="top_loading_c">
          <el-button>
            <IconifyIconOffline
              :icon="RefreshRight"
              style="margin-right: 10px; font-size: 18px"
            />
            最新入库<span>999</span>条，点击加载
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
          <card-item :item="item" :has-check="true" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.back {
  position: absolute;
  left: 24px;
  top: 14px;
  font-size: 14px;
  color: #fff;

  span {
    cursor: pointer;
  }

  i {
    margin: 0 10px;
    color: #fff;
  }
}

.search_network {
  padding: 25px 30px 220px;

  .top_loading {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
    padding: 10px 30px;
    border: 1px solid #b7eb8f;
    background: #f6ffed;

    div {
      display: flex;
      align-items: center;
    }

    &_c {
      font-size: 14px;

      .el-button {
        border-radius: 30px;
        width: 334px;
        height: 43px;
        background: #1890ff;
        color: #fff;
      }
    }

    &_r {
      font-size: 14px;

      .el-button {
        margin-left: 15px;
        padding: 0 7px;
        border-radius: 2px;
        width: 166px;
        height: 22px;
        background: #1890ff;
        box-shadow: 0 2px 0 rgba(0, 0, 0, 0.043);
        color: #fff;
      }
    }
  }
}

i {
  color: #1890ff;
}
</style>
