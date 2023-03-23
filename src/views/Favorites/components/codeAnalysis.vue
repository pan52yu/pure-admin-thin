<script lang="ts" setup>
import { onMounted, ref } from "vue";
import MyTable from "@/components/MyTable/index.vue";

defineOptions({
  name: "codeAnalysis"
});
// 报告form
const taskReportForm = ref({
  // 报告名称
  taskReport: "",
  // 任务类别
  taskType: "all",
  // 报告状态
  taskStatus: "all"
});
// 任务类别列表
const taskTypeList = ref([
  {
    label: "全部",
    value: 0
  },
  {
    label: "预警任务",
    value: 1
  },
  {
    label: "突发事件",
    value: 2
  }
]);
// 报告状态列表
const taskStatusList = ref([
  {
    label: "全部",
    value: 0
  },
  {
    label: "已完结",
    value: 1
  },
  {
    label: "进行中",
    value: 2
  }
]);
// 查询
const query = () => {
  console.log(taskReportForm.value);
};

// 分析报告表格类型
type taskReportType = {
  // 报告名称
  taskReport: string;
  // 任务类别
  taskType: number;
  // 报告状态
  taskStatus: number;
  //   开始结束时间
  time: string;
};
// 分析报告列表
const taskReportList = ref<taskReportType[]>([]);

// 获取分析报告列表
const getTaskPeport = () => {
  for (let i = 0; i < 10; i++) {
    const taskReport = "reportName" + i;
    const taskType = Math.floor(Math.random() * 2) + 1;
    const taskStatus = Math.floor(Math.random() * 2) + 1;
    const time =
      "2021-01-0" + (i + 1) + " 00:00:00 至 2021-01-0" + (i + 1) + " 00:00:00";
    taskReportList.value.push({ taskReport, taskType, taskStatus, time });
  }
};
// 分析报告表格列
const taskReportColumns = ref([
  {
    label: "报告名称",
    prop: "taskReport",
    type: "function",
    callback: data => {
      return `<a class="is_link" href='javascript:void(0);'>${data.taskReport}</a>`;
    }
  },
  {
    label: "报告状态",
    prop: "taskStatus",
    type: "function",
    callback: data => {
      return data.taskStatus === 1
        ? `<span style="color: #8c8c8c">已完结</span>`
        : `<span style="color: #389e0d">进行中</span>`;
    }
  },
  {
    label: "开始结束时间",
    prop: "time"
  },
  {
    label: "任务类别",
    prop: "taskType",
    type: "function",
    callback: data => {
      return data.taskType === 1 ? "预警任务" : "突发事件";
    }
  },

  {
    type: "solt",
    label: "操作",
    prop: "action",
    slot_name: "action"
  }
]);
// 删除
const deleteTaskReport = slot => {
  console.log("删除", slot);
};

onMounted(() => {
  getTaskPeport();
});
</script>

<template>
  <div class="code_analysis">
    <div class="code_analysis_top mt-4 mb-8">
      <el-row :gutter="30">
        <el-col :span="5">
          <span>报告名称</span>
          <el-input v-model.trim="taskReportForm.taskReport" />
        </el-col>
        <el-col :span="5">
          <span>报告状态</span>
          <el-select v-model="taskReportForm.taskStatus" placeholder="请选择">
            <el-option
              v-for="item in taskStatusList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="5">
          <span>任务类别</span>
          <el-select v-model="taskReportForm.taskType" placeholder="请选择">
            <el-option
              v-for="item in taskTypeList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" size="small" @click="query">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <my-table
        :table-data="taskReportList"
        :column="taskReportColumns"
        checkbox
      >
        <template #action="slot">
          <a style="color: #8c8c8c" @click="deleteTaskReport(slot)">删除 </a>
        </template>
      </my-table>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.code_analysis {
  .el-row {
    .el-col {
      display: flex;
      align-items: center;

      span {
        width: 100px;
      }

      .el-select {
        width: 100%;
      }
    }
  }
}
</style>
