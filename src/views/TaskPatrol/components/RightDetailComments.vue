<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";

defineOptions({
  name: "RightDetailComments"
});
const generateRandomTime = computed(() => {
  const days = Math.floor(Math.random() * 10) + 1;
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  return `${days}d${hours}h${minutes}m`;
});
const getRandomTime = () => {
  const year = Math.floor(Math.random() * 3) + 2019;
  const month = Math.floor(Math.random() * 12) + 1;
  const day = Math.floor(Math.random() * 28) + 1;
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);
  const second = Math.floor(Math.random() * 60);
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")} ${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}:${second.toString().padStart(2, "0")}`;
};

const value3 = ref(true);
type CommentType = {
  id: number;
  userName: string;
  like: number;
  avatar: string;
  content: string;
  time: string;
};
const commentList = ref<CommentType[]>([]);
onMounted(() => {
  for (let i = 0; i < 10; i++) {
    commentList.value.push({
      id: i + 1,
      userName: `UserName${i + 1}`,
      avatar: `https://picsum.photos/id/${Math.floor(
        Math.random() * 100
      )}/50/50`,
      like: Math.floor(Math.random() * 100),
      content: `这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息这里是简介信息${
        i + 1
      }`,
      time: getRandomTime()
    });
  }
});
</script>

<template>
  <div class="right_detail_comments">
    <div class="title">
      <h4>评论</h4>
      <div>
        <span>采集剩余时间{{ generateRandomTime }}</span>
        <el-switch
          v-model="value3"
          inline-prompt
          active-text="On"
          inactive-text="Off"
        />
        <span>评论定时采集</span>
      </div>
    </div>
    <div class="comments">
      <div class="comments_item" v-for="item in commentList" :key="item.id">
        <el-avatar :size="50" :src="item.avatar" />
        <div class="com_user_info">
          <header>
            <strong>{{ item.userName }}</strong>
            <div>
              <span> <font-icon icon="icon-dianzan" />{{ item.like }}</span>
              <span>{{ item.time }}</span>
            </div>
          </header>
          <footer>
            {{ item.content }}
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.right_detail_comments {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #e7e7e7;

    div {
      span:first-child {
        color: #8c8c8c;
      }

      .el-switch {
        margin: 0 0 0 15px;
      }
    }
  }

  .comments {
    &_item {
      display: flex;
      align-items: center;
      padding: 20px 0;
      border-bottom: 1px solid #e7e7e7;

      .el-avatar {
        margin-right: 25px;
      }

      .com_user_info {
        flex: 1;

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #595959;

          .iconfont {
            font-size: 10px;
          }

          span {
            margin-left: 10px;
          }
        }
      }
    }
  }
}
</style>
