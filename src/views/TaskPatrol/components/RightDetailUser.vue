<script lang="ts" setup>
import { ref } from "vue";

defineOptions({
  name: "RightDetailUser"
});
const props = defineProps({
  userDetail: {
    type: Object
  }
});
// 用户信息中间详细列表 >>> 用于循环
const userInfoList = [
  {
    label: "昵称",
    value: props.userDetail.nickName
  },
  {
    label: "抖音号",
    value: props.userDetail.tiktok
  },
  {
    label: "性别",
    value: props.userDetail.gender ? "男" : "女"
  },
  {
    label: "地区",
    value: props.userDetail.city
  },
  {
    label: "语言",
    value: props.userDetail.language
  },
  {
    label: "粉丝数",
    value: props.userDetail.numberOfFans
  },
  {
    label: "获赞数",
    value: props.userDetail.numberOfLikes
  },
  {
    label: "关注数",
    value: props.userDetail.numberOfConcerns
  },
  {
    label: "作品数",
    value: props.userDetail.numberOfWorks
  },
  {
    label: "实采视频",
    value: props.userDetail.liveVideo
  }
];
// 定时采集
const timeAcp = ref(true);
</script>

<template>
  <div class="right_detail_user">
    <div class="title">
      <h4>用户信息</h4>
      <span>信息变更历史</span>
    </div>
    <div class="body">
      <div class="left">
        <el-avatar :size="115" :src="userDetail.userAvatar" />
        <div class="person">个人认证</div>
        <div class="attention">关注 开启定时采集</div>
        <div>
          <el-checkbox v-model="timeAcp" label="已开启定时采集" />
        </div>
      </div>
      <div class="center">
        <div v-for="(item, index) in userInfoList" :key="index">
          <span>{{ item.label }}</span>
          <i
            :class="{
              is_link: ['作品数', '实采视频'].includes(item.label)
            }"
            >{{ item.value }}</i
          >
        </div>
      </div>
      <div class="right">
        <div class="right_content">
          <p>简介</p>
          <div>
            这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息
          </div>
        </div>
        <div class="right_two right_content">
          <p>标签</p>
          <div v-if="userDetail.labelList && userDetail.labelList.length">
            <span v-for="item in userDetail.labelList" :key="item">
              {{ item }}
            </span>
          </div>
        </div>
        <div class="right_content right_three">
          <p>同城</p>
          <div>
            <span v-for="item in userDetail.sameCityList" :key="item">
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.right_detail_user {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      cursor: pointer;
      font-size: 14px;
      color: #797373;
    }
  }

  .body {
    display: flex;
  }

  .left {
    margin-top: 25px;
    width: 151px * 1.33;
    text-align: center;

    div {
      line-height: 31px * 1.33;
    }

    .person {
      margin: 5px 0 20px 0;
      border: 1px solid #ffc069;
      height: 31px * 1.33;
      background: #fff7e6;
      font-size: 14px;
    }

    .attention {
      border: 1px solid #1890ff;
      border-radius: 2px;
      height: 31px * 1.33;
      background: #1890ff;
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.043);
      color: #fff;
    }
  }

  .center {
    margin: 0 0 0 44px;
    width: 380px;

    div {
      margin-bottom: 5px;

      span {
        display: inline-block;
        width: 100px;
        color: #8c8c8c;
      }

      .is_link {
        cursor: pointer;
        color: #1890ff;
      }
    }
  }

  .right {
    flex: 1;

    .right_content {
      display: flex;

      p {
        margin-right: 10px;
        color: #8c8c8c;
      }

      div {
        flex: 1;
      }

      span {
        margin-right: 8px;
        color: #1890ff;
      }
    }

    .right_two {
      margin: 20px 0;
    }

    .right_three {
      span {
        cursor: pointer;
      }
    }
  }
}
</style>
