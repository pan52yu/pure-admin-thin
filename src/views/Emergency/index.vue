<script setup lang="ts">
import EmergencyItem from "@/views/Emergency/components/EmergencyItem.vue";

defineOptions({
  name: "Emergency"
});
// 查看全部
const seeAll = () => {
  console.log("查看全部");
};
</script>

<template>
  <div class="emergency">
    <div class="emergency_top">
      <div class="emergency_top_l">
        <span class="title">突发事件/区域采集</span>
        <span> 快速下载区域内最近发过视频用户的新所有视频 </span>
      </div>
      <div class="emergency_top_r">
        <span>进行中 3 / 剩余可添加 0 </span>
        <el-button type="primary">添加</el-button>
      </div>
    </div>
    <div class="emergency_body">
      <div class="emergency_body_title">
        <h4>进行中的事件</h4>
      </div>
      <div class="emergency_body_content">
        <el-row :gutter="30">
          <el-col class="mb-8" :span="8" v-for="item in 6" :key="item">
            <EmergencyItem />
          </el-col>
        </el-row>
      </div>
      <div class="emergency_body_title">
        <h4>已结束事件</h4>
      </div>
      <div class="emergency_body_content">
        <el-row :gutter="30">
          <el-col class="mb-8" :span="8" v-for="item in 6" :key="item">
            <EmergencyItem />
          </el-col>
        </el-row>
      </div>
      <div class="see_all">
        <el-button @click="seeAll">查看全部</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.emergency {
  background: #fff;

  .emergency_top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 50px 10px 50px;
    font-size: 14px;
    border-bottom: 1px solid #f0f0f0;

    &_l {
      .title {
        font-size: 30px;
        font-weight: 700;
        color: #1f6bdf;
        margin-right: 30px;
      }

      span {
        color: #8c8c8c;
      }
    }

    &_r {
      span {
        color: #595959;
        margin-right: 30px;
      }
    }
  }

  .emergency_body {
    padding: 30px 50px 100px 50px;

    &_title {
      border-bottom: 1px solid #f0f0f0;
      margin-bottom: 20px;
      padding-bottom: 15px;

      h4 {
        font-size: 24px;
        line-height: 32px;
        color: #000;
      }
    }

    &_content {
      margin-bottom: 25px;
    }

    .see_all {
      text-align: center;

      .el-button {
        width: 200px;
        padding: 0 20px;
        border-radius: 40px;
      }
    }
  }
}
</style>
