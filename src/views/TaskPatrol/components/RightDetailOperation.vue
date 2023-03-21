<script lang="ts" setup>
defineOptions({
  name: "RightDetailOperation"
});
const videoStatus = Math.random() > 0.5;
</script>

<template>
  <div class="right_detail_operation">
    <div class="title">
      <h4>操作</h4>
    </div>
    <div class="content">
      <div>
        <el-button type="primary">收藏</el-button>
        <el-button>复制内容转发</el-button>
        <el-button>一键推钉钉</el-button>
        <el-button>一键推微信</el-button>
        <el-button>一键推APP</el-button>
      </div>
      <div>
        <!--        如果没有下载视频或已经清理 显示下载视频
如果已经下载了并有效，显示保存视频-->
        <el-button v-if="videoStatus">保存视频</el-button>
        <el-button v-else type="primary">下载视频</el-button>
        <el-button>保存报告</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.right_detail_operation {
  margin: 25px 0;

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
  }
}
</style>
