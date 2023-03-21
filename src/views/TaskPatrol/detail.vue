<script lang="ts" setup>
import { onMounted, ref } from "vue";
import ArrowRight from "@iconify-icons/ep/arrow-right-bold";
import genUserImg from "@/assets/imgs/scuser.png";
import RightDetailUser from "@/views/TaskPatrol/components/RightDetailUser.vue";
import RightDetailVideo from "@/views/TaskPatrol/components/RightDetailVideo.vue";
import RightDetailOperation from "@/views/TaskPatrol/components/RightDetailOperation.vue";
import RightDetailComments from "@/views/TaskPatrol/components/RightDetailComments.vue";
import { useRoute, useRouter } from "vue-router";
import { USER_DETAIL } from "@/utils/enum";

defineOptions({
  name: "TaskPatrolDetail"
});
// 用户信息
const userDetail = ref(USER_DETAIL);
const route = useRoute();
const router = useRouter();
// 跳转用户画像
const toUserPortraits = () => {
  router.push({
    name: "UserPortrait",
    params: {
      id: route.params.id
    }
  });
};
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
      <div class="gen_user_tro" @click="toUserPortraits">
        <img :src="genUserImg" alt="" v-for="item in 3" :key="item" />
        <span>生成用户画像</span>
        <IconifyIconOffline :icon="ArrowRight" />
      </div>
    </div>
    <div class="right_detail">
      <right-detail-user :user-detail="userDetail" />
      <right-detail-video />
      <right-detail-operation />
      <right-detail-comments />
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
    .right_detail_video,
    .right_detail_operation,
    .right_detail_comments {
      background: #fff;
      padding: 40px;
    }

    ::v-deep(h4) {
      font-size: 24px;
      line-height: 32px;
      font-weight: 700;
    }
  }
}
</style>
