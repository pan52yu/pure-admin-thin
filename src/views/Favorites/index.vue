<script setup lang="ts">
import VideoCollection from "@/views/Favorites/components/videoCollection.vue";
import VideoDownload from "@/views/Favorites/components/videoDownload.vue";
import VideoPush from "@/views/Favorites/components/videoPush.vue";
import CodeAnalysis from "@/views/Favorites/components/codeAnalysis.vue";

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
      <el-tab-pane label="推送记录">
        <video-push />
      </el-tab-pane>
      <el-tab-pane label="分析报告">
        <code-analysis />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style lang="scss" scoped>
.code_analysis,
.video_download,
.video_push {
  padding: 0 30px 30px;
}
</style>
