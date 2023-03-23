<script setup lang="ts">
import VideoCollection from "@/views/Favorites/components/videoCollection.vue";
import VideoDownload from "@/views/Favorites/components/videoDownload.vue";

defineOptions({
  name: "Favorites"
});
</script>

<template>
  <div class="p-4">
    <el-tabs type="border-card">
      <el-tab-pane label="视频收藏">
        <video-collection />
      </el-tab-pane>
      <el-tab-pane label="视频下载">
        <video-download />
      </el-tab-pane>
      <el-tab-pane label="推送记录">推送记录</el-tab-pane>
      <el-tab-pane label="分析报告">分析报告</el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped></style>
