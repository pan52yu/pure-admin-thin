<script lang="ts" setup>
defineOptions({
  name: "EmergencyItem"
});
</script>

<template>
  <div class="emergency_item">
    <el-card>
      <div class="emergency_item_map">地图</div>
      <div class="text-base p-2">
        <div class="flex justify-between items-center mt-4 mb-0.5">
          <h4 class="text-xl">XXX任务名称</h4>
          <div class="text-sm flex items-center">
            <a class="mr-4 is_link" href="javascript:void(0);">分析报告</a>
            <el-button type="primary" size="small">管理</el-button>
          </div>
        </div>
        <div class="item_content p-2">
          <div>
            定位用户
            <span class="link_color">9999</span>
            &nbsp;&nbsp;&nbsp;已采视频
            <span class="link_color">9999</span>
            &nbsp;&nbsp;&nbsp;
            <span class="loader" />
          </div>
          <div>
            开始时间
            <strong>2023-01-09 23:23:00</strong>
          </div>
          <div>
            <div>
              截止时间
              <strong>x天x小时x分钟</strong>
            </div>
            <div>
              <el-button size="small">延长</el-button>
              <el-button size="small">停止</el-button>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.emergency_item {
  width: 100%;
  height: 100%;

  ::v-deep(.el-card__body) {
    margin: 0;
    padding: 0;
  }

  &_map {
    width: 100%;
    height: 280px;
    background-color: #f0f0f0;
  }

  .item_content {
    color: #595959;

    > div {
      margin: 5px 0;
    }

    div:last-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
