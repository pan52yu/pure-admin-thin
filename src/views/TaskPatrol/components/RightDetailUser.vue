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
    align-items: center;
    justify-content: space-between;

    span {
      color: #797373;
      font-size: 14px;
      cursor: pointer;
    }
  }

  .body {
    display: flex;
  }

  .left {
    width: 151px * 1.33;
    text-align: center;
    margin-top: 25px;

    div {
      line-height: 31px * 1.33;
    }

    .person {
      height: 31px * 1.33;
      background: #fff7e6;
      border: 1px solid #ffc069;
      font-size: 14px;
      margin: 5px 0 20px 0;
    }

    .attention {
      height: 31px * 1.33;
      background: #1890ff;
      border: 1px solid #1890ff;
      box-shadow: 0 2px 0 rgba(0, 0, 0, 0.043);
      border-radius: 2px;
      color: #fff;
    }
  }

  .center {
    width: 380px;
    margin: 0 0 0 44px;

    div {
      margin-bottom: 5px;

      span {
        color: #8c8c8c;
        display: inline-block;
        width: 100px;
      }

      .is_link {
        color: #1890ff;
        cursor: pointer;
      }
    }
  }

  .right {
    flex: 1;

    .right_content {
      display: flex;

      p {
        color: #8c8c8c;
        margin-right: 10px;
      }

      div {
        flex: 1;
      }

      span {
        color: #1890ff;
        margin-right: 8px;
      }
    }

    .right_two {
      margin: 20px 0;
    }
  }
}
</style>
