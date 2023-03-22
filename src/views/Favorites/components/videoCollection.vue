<script lang="ts" setup>
import { ref } from "vue";

defineOptions({
  name: "videoCollection"
});
// 收藏时间
const collectionTime = ref("");
// 快捷选项 >>> 快速选中时间范围
const shortcuts = [
  {
    text: "上一周",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    }
  },
  {
    text: "上一月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    }
  },
  {
    text: "上三个月",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    }
  }
];
</script>

<template>
  <div class="videoCollection flex pt-3.5 min-h-screen">
    <div class="w-64 border-r border-gray-300 pr-6">
      <div class="flex-ac mb-6">
        <div class="font-bold text-2xl">分组标签</div>
        <span class="text-sm is_link">管理</span>
        <span class="text-sm is_link">新建</span>
      </div>
      <div style="background: red">2</div>
    </div>
    <div class="flex-1 pl-6">
      <div class="mb-8">
        <span class="text-gray-700 text-base">收藏时间</span>
        <el-date-picker
          class="mx-5"
          v-model="collectionTime"
          type="datetimerange"
          :shortcuts="shortcuts"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        />
        <el-button size="small" type="primary">查询</el-button>
      </div>
      <div>待封装</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.videoCollection {
  border-right: 1px solid #d9d9d9;
}
</style>
