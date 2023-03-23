<script lang="ts" setup>
import { EmergencyType } from "@/types/data";
import MyMap from "@/components/MyMap/index.vue";

defineOptions({
  name: "EmergencyItem"
});
defineProps({
  item: {
    type: Object as PropType<EmergencyType>,
    required: true
  },
  //   是否已结束
  isEnd: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div class="emergency_item">
    <el-card>
      <div class="emergency_item_map">
        <my-map :id="item.id" :item="item" />
        <div class="mask" v-if="isEnd" />
      </div>
      <div class="text-base p-2">
        <div class="flex justify-between items-center mt-4 mb-0.5">
          <h4 class="text-xl">{{ item.name }}</h4>
          <div class="text-sm flex items-center">
            <a class="mr-4 is_link" href="javascript:void(0);">分析报告</a>
            <el-button :type="isEnd ? '' : 'primary'" size="small"
              >管理
            </el-button>
          </div>
        </div>
        <div class="item_content p-2">
          <div>
            定位用户
            <span class="link_color">{{ item.userNum }}</span>
            &nbsp;&nbsp;&nbsp;已采视频
            <span class="link_color">{{ item.videoNum }}</span>
            &nbsp;&nbsp;&nbsp;
            <span v-if="item.status" class="loader" />
            <font-icon v-else icon="icon-duigou" style="color: #52c41a" />
          </div>
          <div>
            开始时间
            <strong>{{ item.startTime }}</strong>
          </div>
          <div>
            <div v-if="!isEnd">
              截止时间
              <strong>{{ item.endTime }}</strong>
            </div>
            <div v-else>
              结束时间
              <strong>{{ item.finishTime }}</strong>
            </div>
            <div v-if="!isEnd">
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
    position: relative;
    width: 100%;
    height: 280px;
    background-color: #f0f0f0;

    .mask {
      position: absolute;
      top: 0;
      z-index: 1;
      width: 100%;
      height: 100%;
      background: rgba(217, 217, 217, 0.8);
      color: #d9d9d9;
    }
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
