<script setup lang="ts">
import TopBanner from "@/views/NetworkSearch/components/TopBanner.vue";
import ResultCard from "@/views/NetworkSearch/components/ResultCard.vue";
import { ListType } from "@/types/data";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import MyFavorites from "@/components/MyFavorites.vue";
defineOptions({
  name: "SearchResults"
});

const netSearchList: ListType[] = [];
for (let i = 0; i < 9; i++) {
  const newItem: ListType = {
    url: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200/200`,
    title: `Title ${i + 1}`,
    loading: i % 2 === 0,
    avatar: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/50/50`,
    name: `User ${i + 1}`,
    dianzan: Math.floor(Math.random() * 100),
    pinglun: Math.floor(Math.random() * 100),
    zhuanfa: Math.floor(Math.random() * 100),
    time: "2023-03-09 10:42:34",
    favoriteStatus: i % 2 === 0,
    id: Math.floor(Math.random() * 100)
  };
  netSearchList.push(newItem);
}
const router = useRouter();
const goSearch = (type: string) => {
  if (type === "network") {
    router.push("/networkSearch/network");
  } else if (type === "station") {
    router.push("/networkSearch/station");
  }
};
onMounted(() => {});
</script>

<template>
  <div>
    <my-favorites />
    <top-banner />
    <div class="result_body">
      <div class="body_l">
        <div class="loading_top">
          <span
            class="loader"
            style="margin: 0 14px 0 28px; width: 20px; height: 20px"
          />正在全网实时搜索视频并入库&nbsp;
          <span>22/99</span>
        </div>
        <div>
          <result-card :cardList="netSearchList" :haveSkeleton="true" />
        </div>
        <div class="see_more">
          <button @click="goSearch('network')">查看全部</button>
        </div>
      </div>
      <div class="body_r">
        <div class="loading_top">
          <FontIcon
            style="color: #d9d9d9; margin: 0 14px 0 28px"
            icon="icon-duigou"
          />
          正在从已入库视频中检索到&nbsp;
          <span>9999</span>
        </div>
        <div>
          <result-card :cardList="netSearchList" />
        </div>
        <div class="see_more">
          <button @click="goSearch('station')">查看全部</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.result_body {
  display: flex;

  .body_l {
    flex: 1;
    padding: 25px 18px 106px 37px;
  }

  .body_r {
    flex: 1;
    padding: 25px 18px 106px 37px;
    background: #e6f7ff;
  }
}

.loading_top {
  width: 656px;
  height: 62px;
  line-height: 62px;
  background: #f6ffed;
  border: 1px solid #b7eb8f;
  display: flex;
  align-items: center;
  margin-bottom: 18px;

  span {
    color: #1890ff;
  }
}

.see_more {
  text-align: center;
  font-size: 14px;

  button {
    width: 153px;
    height: 32px;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.016);
    border-radius: 30px;
  }
}
</style>
