<script lang="ts" setup>
import { ref } from "vue";

defineOptions({
  name: "FavoritesItem"
});
// 全选标签
const checkAll = ref(false);
const check1 = ref(false);
</script>

<template>
  <div class="favorites_item">
    <header class="flex-bc px-6">
      <div>
        <el-checkbox v-model="checkAll" />
        <span class="ml-4">共 1 条 已选 0 条</span>
      </div>
      <div>
        <el-button>修改标签</el-button>
        <el-button>导出到Excel</el-button>
      </div>
    </header>
    <div class="favorites_item_content flex px-6">
      <el-checkbox v-model="check1" />
      <div class="content_img" />
      <div class="user_info">
        <div class="user_info_top">
          <font-icon icon="icon-douyin" />
          <span>userName</span>
        </div>
        <div class="user_info_introduction">
          这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里...
        </div>
        <div>
          <span>命中</span>
          <i>xx词</i>
        </div>
        <div>
          <span>同城</span>
          <a href="javascript:void(0);">同城1</a>
        </div>
        <div>
          <span>标签</span>
          <i>标签1</i>
          <el-button size="small">添加</el-button>
        </div>
      </div>
      <div class="space" />
      <div class="video_detail">
        <div class="video_detail_l">12</div>
        <div class="video_detail_r">5678</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.favorites_item {
  header {
    height: 63px;
    background: #fafafa;
  }

  &_content {
    .content_img {
      width: 200px;
      height: 250px;
      background: #ccc;
      margin-left: 15px;
    }

    .user_info {
      font-size: 14px;
      flex: 1;
      margin-left: 20px;
      padding: 10px;

      &_introduction {
        margin: 15px 0 !important;
      }

      > div {
        margin: 5px 0;

        span,
        .iconfont {
          color: #8c8c8c;
          margin-right: 10px;
        }
      }

      a {
        color: #1890ff;
      }

      .el-button {
        margin-left: 15px;
      }
    }

    .space {
      background: #d9d9d9;
      width: 1px;
      margin: 0 20px;
    }

    .video_detail {
      width: 38%;
      background: pink;
      padding: 10px;
    }
  }
}
</style>
