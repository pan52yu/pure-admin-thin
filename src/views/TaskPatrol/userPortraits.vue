<script lang="ts" setup>
import RightDetailUser from "@/views/TaskPatrol/components/RightDetailUser.vue";
import { onMounted, ref } from "vue";
import { USER_DETAIL } from "@/utils/enum";
import WordCloud from "@/components/WordCloud.vue";
import MyTable from "@/components/MyTable/index.vue";
import VCharts from "@/components/MyEcharts/v-charts.vue";
import { useContentDistribution } from "@/views/TaskPatrol/hook";

defineOptions({
  name: "userPortraits"
});
// 用户信息
const userDetail = ref(USER_DETAIL);
// 获取用户信息
const getUserDetail = () => {
  for (let i = 0; i < 5; i++) {
    userDetail.value.labelList.push(`#标签${Math.floor(Math.random() * 20)}`);
  }
  for (let i = 0; i < 30; i++) {
    userDetail.value.sameCityList.push(
      `同城${Math.floor(Math.random() * 100)}`
    );
  }
};

const { options, selectchanged, handleChartClick } = useContentDistribution();

onMounted(() => {
  getUserDetail();
});
// --------------------
let checkList = [];
const onload = data => {
  console.log(data);
};

const updateList = data => {
  checkList = data;
};
const column = [
  {
    type: "function",
    label: "城市",
    prop: "city",
    callback: data => {
      return `<a href="javaScript:;">${data.city}</a>`;
    }
  },
  { label: "次数", prop: "num", width: 100 }
];
const tableData = [
  {
    city: "上海",
    num: 100
  },
  {
    city: "北京",
    num: 99
  },
  {
    city: "广州",
    num: 98
  },
  {
    city: "深圳",
    num: 97
  },
  {
    city: "杭州",
    num: 96
  },
  {
    city: "成都",
    num: 95
  }
];
// ---------------------------
</script>

<template>
  <div class="user_portraits">
    <h1>用户画像</h1>
    <right-detail-user :user-detail="userDetail" />
    <div class="user_portraits_two">
      <div class="two_body">
        <div class="title">
          <h4>内容发布趋势</h4>
          <div>
            <span>10条</span>
            <span>20条</span>
          </div>
        </div>
        <div class="content">
          <v-charts
            :options="options"
            @selectchanged="selectchanged"
            @chart-click="handleChartClick"
          />
        </div>
      </div>
      <div class="two_body">
        <div class="title">
          <h4>粉丝变化趋势</h4>
        </div>
        <div class="content">
          <v-charts :options="options" />
        </div>
      </div>
      <div class="two_body">
        <div class="title">
          <h4>视频城市定位出现次数</h4>
        </div>
        <div class="content">
          <my-table
            :column="column"
            :check-list="checkList"
            index
            on-load
            @onload="onload"
            @updateList="updateList"
            :table-data="tableData"
          />
          <div class="all">全部</div>
        </div>
      </div>
    </div>
    <div class="word_cloud">
      <div class="title">
        <h4>用户内容词云</h4>
      </div>
      <div class="content">
        <word-cloud />
      </div>
    </div>
    <div class="user_info">
      <div class="title">
        <h4>用户虚实信息</h4>
      </div>
      <div class="content">
        <my-table
          :column="column"
          :check-list="checkList"
          index
          on-load
          @onload="onload"
          @updateList="updateList"
          :table-data="tableData"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user_portraits {
  padding: 30px 20px 60px 20px;
  background: #eef0f3;

  h1 {
    margin-bottom: 15px;
    text-align: center;
  }

  ::v-deep(h4) {
    line-height: 32px;
    font-weight: 700;
    font-size: 24px;
  }

  .right_detail_user,
  .word_cloud,
  .user_info {
    padding: 40px;
    background: #fff;
  }

  &_two {
    display: flex;
    justify-content: space-between;
    margin: 30px 0;

    .two_body {
      padding: 25px 20px;
      width: 32.5%;
      background: #fff;

      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 25px;
      }

      .content {
        height: 400px;

        .all {
          margin: 20px 0 0 60px;
          cursor: pointer;
          font-size: 14px;
          color: #1890ff;
        }
      }
    }
  }

  .word_cloud {
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .user_info {
    margin-top: 30px;
  }

  ::v-deep(a) {
    color: #1890ff;
  }
}
</style>
