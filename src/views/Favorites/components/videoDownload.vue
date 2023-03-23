<script lang="ts" setup>
import FavoritesItem from "@/views/Favorites/components/FavoritesItem.vue";
import { ref } from "vue";

defineOptions({
  name: "videoDownload"
});
// 添加下载的input绑定值
const downloadInput = ref("");
</script>

<template>
  <div class="video_download">
    <div class="video_download_top flex-c m-6">
      <span class="w-20">视频链接</span>
      <el-input
        v-model="downloadInput"
        placeholder="直接粘贴抖音视频分享链接或视频ID..."
      >
        <template #append>
          <div class="input_r">
            <font-icon icon="icon-xiazai" />
            <el-button type="primary">添加下载</el-button>
          </div>
        </template>
      </el-input>
    </div>
    <favorites-item is-video-download />
  </div>
</template>

<style lang="scss" scoped>
.video_download {
  padding: 0 30px 30px;

  &_top {
    font-size: 14px;

    .el-input {
      width: 600px;
      height: 52px;
    }

    ::v-deep(.el-input-group__append) {
      background: #fa8c16;
    }

    .input_r {
      color: #fff;
      display: flex;
      align-items: center;

      .iconfont {
        font-size: 14px;
        margin-right: 10px;
      }
    }
  }
}
</style>
