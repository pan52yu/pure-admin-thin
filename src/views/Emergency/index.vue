<script setup lang="ts">
import EmergencyItem from "@/views/Emergency/components/EmergencyItem.vue";
import { onMounted, ref } from "vue";
import { EmergencyType } from "@/types/data";
import { useRouter } from "vue-router";

defineOptions({
  name: "Emergency"
});

const router = useRouter();
// 去添加突发事件
const addEmergency = () => {
  router.push("/emergency/add");
};

// 进行中的突发事件
const emergencyList = ref<EmergencyType[]>([]);

// 获取进行中的突发事件
const getEmergencyList = () => {
  const getRandomTime = () => {
    const year = Math.floor(Math.random() * 2) + 2021;
    const month = Math.floor(Math.random() * 12) + 1;
    const day = Math.floor(Math.random() * 28) + 1;
    const hour = Math.floor(Math.random() * 24);
    const minute = Math.floor(Math.random() * 60);
    const second = Math.floor(Math.random() * 60);
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  };
  for (let i = 0, len = 6; i < len; i++) {
    const start = getRandomTime();
    const finish = getRandomTime();
    const end = getRandomTime();
    const diff = new Date(end).getTime() - new Date(start).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    emergencyList.value.push({
      id: Math.floor(Math.random() * 1000),
      name: "任务名称" + Math.floor(Math.random() * 100),
      userNum: Math.floor(Math.random() * 1000),
      videoNum: Math.floor(Math.random() * 1000),
      startTime: start,
      endTime: `${days}天${hours}小时${minutes}分钟`,
      finishTime: finish,
      status: Math.random() > 0.5
    });
  }
};

onMounted(() => {
  getEmergencyList();
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
        <el-button type="primary" @click="addEmergency">添加</el-button>
      </div>
    </div>
    <div class="emergency_body">
      <div class="emergency_body_title">
        <h4>进行中的事件</h4>
      </div>
      <div class="emergency_body_content">
        <el-row :gutter="30">
          <el-col
            class="mb-8"
            :span="8"
            v-for="item in emergencyList"
            :key="item.id"
          >
            <EmergencyItem :item="item" />
          </el-col>
        </el-row>
      </div>
      <div class="emergency_body_title">
        <h4>已结束事件</h4>
      </div>
      <div class="emergency_body_content">
        <el-row :gutter="30">
          <el-col
            class="mb-8"
            :span="8"
            v-for="item in emergencyList"
            :key="item.id"
          >
            <EmergencyItem :item="item" is-end />
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
