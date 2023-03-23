<script lang="ts" setup>
import FavoritesItem from "@/views/Favorites/components/FavoritesItem.vue";
import { ref } from "vue";

defineOptions({
  name: "videoPush"
});
// 推送时间
const pushTime = ref("");

// 查询
const search = () => {
  console.log(pushTime.value);
};
</script>

<template>
  <div class="video_push">
    <div class="video_push_top">
      <span>推送时间</span>
      <el-date-picker
        v-model="pushTime"
        type="datetimerange"
        range-separator="至"
        start-placeholder=""
        end-placeholder=""
      />
      <el-button type="primary" size="small" @click="search">查询</el-button>
    </div>
    <favorites-item />
  </div>
</template>

<style lang="scss" scoped>
.video_push {
  &_top {
    height: 34px;
    line-height: 34px;
    font-size: 16px;
    color: #595959;
    margin: 35px 0;

    ::v-deep(.el-date-editor) {
      width: 300px !important;
      margin: 0 20px;
    }
  }
}
</style>
