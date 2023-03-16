<script lang="ts" setup>
import { PropType } from "vue";
import { ListType } from "@/types/data";

defineOptions({
  name: "ItemCard"
});
defineProps({
  item: {
    type: Object as PropType<ListType>
  }
});
</script>

<template>
  <div
    class="card_info animate__animated"
    :class="{ animate__backInLeft: item.animation }"
  >
    <div class="card_img">
      <el-image :src="item.url" fit="fill" />
    </div>
    <p>
      <span>{{ item.title }}</span>
      <span
        v-if="item.loading"
        class="loader"
        style="width: 16px; height: 16px"
      />
      <font-icon v-else icon="icon-duigou" style="color: #52c41a" />
    </p>
    <div class="card_user">
      <div>
        <el-avatar style="margin-right: 5px" size="small" :src="item.avatar" />
        <span>{{ item.name }}</span>
      </div>
      <div>
        <font-icon icon="icon-dianzan" /><span>{{ item.dianzan }}</span>
        <font-icon icon="icon-pinglun" style="margin-left: 5px" /><span>{{
          item.pinglun
        }}</span>
        <font-icon icon="icon-zhuanfa" /><span>{{ item.zhuanfa }}</span>
      </div>
    </div>
    <div class="card_detail">
      <div>发布 {{ item.time }}</div>
      <div>
        <el-button v-if="item.favoriteStatus" size="small" type="primary" plain
          >收藏</el-button
        >
        <el-button v-else size="small" type="info" plain>已收藏</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card_info {
  width: 100%;
  color: #8c8c8c;
  font-size: 14px;
  margin-bottom: 30px;

  .card_img {
    width: 100%;

    .el-image {
      width: 100%;
      height: 380px;
    }
  }

  p {
    color: #000000;
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .card_user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;

    div {
      display: flex;
      align-items: center;
    }
  }

  .card_detail {
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .iconfont {
    color: #8c8c8c;
  }
}
</style>
