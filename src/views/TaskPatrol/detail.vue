<script lang="ts" setup>
import { onMounted, ref } from "vue";
import ArrowRight from "@iconify-icons/ep/arrow-right-bold";
import genUserImg from "@/assets/imgs/scuser.png";
import RightDetailUser from "@/views/TaskPatrol/components/RightDetailUser.vue";
import RightDetailVideo from "@/views/TaskPatrol/components/RightDetailVideo.vue";

defineOptions({
  name: "TaskPatrolDetail"
});
// 用户信息
const userDetail = ref({
  imgUrl: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200/200`,
  userAvatar: `https://picsum.photos/id/${Math.floor(
    Math.random() * 100
  )}/115/115`,
  // 昵称
  nickName: `昵称${Math.floor(Math.random() * 100)}`,
  // 抖音号
  tiktok: `${Math.floor(Math.random() * 100000)}`,
  // 性别
  gender: Math.random() > 0.5,
  // 地区
  city: `地区${Math.floor(Math.random() * 100)}`,
  // 语言
  language: `语言${Math.floor(Math.random() * 100)}`,
  // 粉丝数
  numberOfFans: `${Math.floor(Math.random() * 10000)}`,
  // 获赞数
  numberOfLikes: `${Math.floor(Math.random() * 10000)}`,
  // 关注数
  numberOfConcerns: `${Math.floor(Math.random() * 10000)}`,
  // 作品数
  numberOfWorks: `${Math.floor(Math.random() * 10000)}`,
  // 实采视频
  liveVideo: `${Math.floor(Math.random() * 10000)}`,
  //   标签列表
  labelList: [],
  //   同城列表
  sameCityList: []
});

onMounted(() => {
  for (let i = 0; i < 5; i++) {
    userDetail.value.labelList.push(`#标签${Math.floor(Math.random() * 20)}`);
  }
  for (let i = 0; i < 30; i++) {
    userDetail.value.sameCityList.push(
      `同城${Math.floor(Math.random() * 100)}`
    );
  }
});
</script>

<template>
  <div class="task_detail">
    <div class="left_img">
      <el-image :src="userDetail.imgUrl" fit="fill" />
      <div class="gen_user_tro">
        <img :src="genUserImg" alt="" v-for="item in 3" :key="item" />
        <span>生成用户画像</span>
        <IconifyIconOffline :icon="ArrowRight" />
      </div>
    </div>
    <div class="right_detail">
      <right-detail-user :user-detail="userDetail" />
      <right-detail-video />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.task_detail {
  padding: 20px;
  display: flex;
  background: #eeeeee;

  .left_img {
    width: 613px;
    margin-right: 45px;

    .el-image {
      width: 100%;
      margin-bottom: 30px;
    }

    .gen_user_tro {
      font-size: 24px;
      font-weight: 700;
      height: 90px;
      background: #0030ad;
      color: #fff;
      display: flex;
      align-items: center;

      img {
        height: 90px;
      }

      span {
        margin: 0 10px 0 70px;
      }
    }
  }

  .right_detail {
    flex: 1;
    font-size: 14px;

    .right_detail_user,
    .right_detail_video {
      background: #fff;
      padding: 40px;
    }

    h4 {
      font-size: 24px;
      line-height: 32px;
      font-weight: 700;
    }
  }
}
</style>
