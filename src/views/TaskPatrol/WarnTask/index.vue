<script lang="ts" setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import MyTable from "@/components/MyTable/index.vue";
import CardPagination from "@/layout/components/CardCom/CardPagination.vue";

defineOptions({
  name: "WarnTask"
});
const router = useRouter();
// 去添加预警任务
const toAddWarnTask = () => {
  router.push({ name: "AddWarnTask" });
};
// 查询预警任务
const warnTaskForm = ref({
  // 任务名称
  taskName: "",
  // 任务状态
  taskStatus: 2,
  //   页码
  pageNum: 1,
  //   每页条数
  pageSize: 20
});

// 预警任务总数
const warnTaskTotal = ref(999);
// 任务状态列表
const taskStatusList = ref([
  {
    label: "全部",
    value: 2
  },
  {
    label: "启用",
    value: 1
  },
  {
    label: "停用",
    value: 0
  }
]);
// 查询
const queryWarnTask = () => {
  console.log(warnTaskForm.value);
};

type WarnTaskItem = {
  // 任务名称
  taskName: string;
  // 任务状态
  taskStatus: number;
  //   开始和结束时间
  startAndEndTime: string;
  //   匹配模式
  matchThePattern: number;
};
// 预警任务列表
const warnTaskList = ref<WarnTaskItem[]>([]);
// column
const column = [
  {
    type: "function",
    label: "任务名称",
    prop: "taskName",
    callback: (data: WarnTaskItem) => {
      return `<a href="javaScript:;">${data.taskName}</a>`;
    }
  },
  {
    type: "function",
    label: "任务状态",
    prop: "taskStatus",
    callback: (data: WarnTaskItem) => {
      return data.taskStatus === 1
        ? `<span style="color: #389e0d">启用</span>`
        : `<span style="color: #8c8c8c">停用</span>`;
    }
  },
  {
    label: "开始和结束时间",
    prop: "startAndEndTime"
  },
  {
    type: "function",
    label: "匹配模式",
    prop: "matchThePattern",
    callback: (data: WarnTaskItem) => {
      return data.matchThePattern === 1 ? "简单模式" : "高级模式";
    }
  },
  {
    type: "solt",
    label: "操作",
    prop: "operation",
    slot_name: "operation"
  }
];
// 获取预警任务列表
const getWarnTaskList = () => {
  warnTaskList.value = [];
  for (let i = 0; i < warnTaskForm.value.pageSize; i++) {
    const taskName = `任务${Math.floor(Math.random() * 100)}`;
    const taskStatus = Math.random() < 0.5 ? 1 : 0;
    const startAndEndTime = `${randomDate()} 至 ${randomDate()}`;
    const matchThePattern = Math.random() < 0.5 ? 1 : 0;
    warnTaskList.value.push({
      taskName,
      taskStatus,
      startAndEndTime,
      matchThePattern
    });
  }

  function randomDate() {
    const start = new Date(2021, 0, 1);
    const end = new Date(2022, 0, 1);
    const date = new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
    const year = date.getFullYear().toString().padStart(4, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
};
// 编辑
const edit = (data: WarnTaskItem) => {
  console.log(data);
};
// 删除
const del = (data: WarnTaskItem) => {
  console.log(data);
};
onMounted(() => {
  getWarnTaskList();
});
</script>

<template>
  <div class="warn_task">
    <div class="warn_task_title">
      <h1>预警任务</h1>
      <div class="warn_task_title_right">
        <el-button type="primary" @click="toAddWarnTask"> 添加</el-button>
      </div>
    </div>
    <div class="warn_task_content">
      <div class="warn_task_content_form">
        <el-row :gutter="40">
          <el-col :span="5"
            ><span>任务名称</span>
            <el-input v-model="warnTaskForm.taskName" />
          </el-col>
          <el-col :span="5"
            ><span>任务状态</span>
            <el-select v-model="warnTaskForm.taskStatus" placeholder="请选择">
              <el-option
                v-for="item in taskStatusList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" size="small" @click="queryWarnTask"
              >查询
            </el-button>
          </el-col>
        </el-row>
      </div>
      <div class="warn_task_content_table">
        <my-table checkbox :column="column" :data="warnTaskList">
          <template v-slot:operation="{ data }">
            <a href="javascript:void(0);" @click="edit(data)">查看报告分析</a>
            <a class="ml-4 mr-4" href="javascript:void(0);" @click="edit(data)"
              >编辑</a
            >
            <a
              style="color: #8c8c8c"
              href="javascript:void(0);"
              @click="del(data)"
              >删除</a
            >
          </template>
        </my-table>
        <br />
        <card-pagination
          :total="warnTaskTotal"
          layout="prev, pager, next"
          v-model:page="warnTaskForm.pageNum"
          v-model:limit="warnTaskForm.pageSize"
          @pagination="getWarnTaskList"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.warn_task {
  padding: 30px 0 60px 0;
  background: #fff;

  &_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 100px 40px 60px;

    border-bottom: 1px solid #f0f0f0;
    border-radius: 5px;
    height: 50px;

    h1 {
      font-size: 30px;
      color: #1f6bdf;
    }
  }

  &_content {
    padding: 30px 30px 200px 60px;

    .el-col {
      display: flex;
      align-items: center;
      font-size: 16px;
      color: #595959;

      span {
        width: 100px;
      }
    }

    &_form {
      margin-bottom: 25px;
    }
  }
}
</style>
