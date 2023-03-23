<script lang="ts" setup>
import { PropType, ref } from "vue";
import { ListType } from "@/types/data";
import { useRouter } from "vue-router";

defineOptions({
  name: "CardItem"
});
const props = defineProps({
  item: {
    type: Object as PropType<ListType>
  },
  hasCheck: {
    type: Boolean,
    default: false
  },
  imgHeight: {
    type: String,
    default: "380px"
  }
});
const emit = defineEmits(["removeCard"]);
// 改变收藏
const collection = ite => {
  ite.favoriteStatus = !ite.favoriteStatus;
  console.log(ite.favoriteStatus);
  if (!ite.favoriteStatus) {
    animateCard(ite);
  }
};

// 改变已读未读
const changReadStatus = ite => {
  ite.readStatus = !ite.readStatus;
};

// 移除任务
const removeTack = (ite, tag) => {
  console.log(ite.taskList, tag, ite.taskList.indexOf(tag));
  ite.taskList.splice(ite.taskList.indexOf(tag), 1);
};
const cardItem = ref(null);
const animateCard = ite => {
  const cardRect = cardItem.value.getBoundingClientRect();
  const distanceX = 200 - cardRect.left - 300;
  const distanceY = 0 - cardRect.top + 200;
  cardItem.value.style.transition = "all 0.5s ease-in-out";
  cardItem.value.style.transform = `translate(${distanceX}px, ${distanceY}px) scale(0.1)`;
  setTimeout(() => {
    emit("removeCard", ite.id);
  }, 500);
};
const router = useRouter();
const videoDetail = () => {
  // /taskPatrol/detail/:id
  router.push({
    path: `/taskPatrol/detail/${props.item.id}`
  });
};
</script>

<template>
  <div
    ref="cardItem"
    class="card_info animate__animated"
    :class="{ animate__backInLeft: item.animation }"
  >
    <div class="card_img">
      <el-image
        @click="videoDetail"
        :style="{ height: imgHeight }"
        :src="item.url"
        fit="fill"
      />
    </div>
    <p>
      <span>{{ item.title }}</span>
      <span
        v-if="item.loading"
        class="loader"
        style="width: 16px; height: 16px"
      />
      <font-icon v-else icon="icon-duigou" style="color: #52c41a" />
    </p>
    <div class="card_user">
      <div>
        <el-avatar style="margin-right: 5px" size="small" :src="item.avatar" />
        <span>{{ item.name }}</span>
      </div>
      <div>
        <font-icon icon="icon-dianzan" />
        <span>{{ item.dianzan }}</span>
        <font-icon icon="icon-pinglun" style="margin-left: 5px" />
        <span>{{ item.pinglun }}</span>
        <font-icon icon="icon-zhuanfa" />
        <span>{{ item.zhuanfa }}</span>
      </div>
    </div>
    <div class="card_detail">
      <div>发布 {{ item.time }}</div>
      <div>
        <el-button
          size="small"
          :type="item.favoriteStatus ? 'primary' : 'info'"
          plain
          @click="collection(item)"
          >{{ item.favoriteStatus ? "收藏" : "已收藏" }}
        </el-button>
      </div>
    </div>
    <div class="card_tack" v-if="item.taskList && item.taskList.length">
      <el-tag
        v-for="tag in item.taskList"
        :key="tag"
        closable
        @close="removeTack(item, tag)"
      >
        {{ tag }}
      </el-tag>
    </div>
    <div v-if="item.keywords" class="card_read">
      <el-button
        @click="changReadStatus(item)"
        size="small"
        :type="item.readStatus ? 'info' : 'primary'"
        plain
        >{{ item.readStatus ? "已读" : "未读" }}
      </el-button>
      <span v-for="words in item.keywords" :key="words">
        {{ words }}
      </span>
    </div>
    <template v-if="hasCheck">
      <!--  eslint-disable-next-line vue/no-mutating-props  -->
      <el-checkbox v-model="item.check" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.card_info {
  margin-bottom: 30px;
  width: 100%;
  font-size: 14px;
  color: #8c8c8c;

  .card_img {
    width: 100%;

    .el-image {
      width: 100%;
    }
  }

  p {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    color: #000000;
  }

  .card_user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;

    div {
      display: flex;
      align-items: center;
    }
  }

  .card_detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
  }

  .iconfont {
    color: #8c8c8c;
  }

  .el-checkbox {
    height: 20px;
  }

  .card_tack {
    margin: 5px 0;

    .el-tag {
      border: none;
      background: transparent;
      color: #1890ff;
    }
  }

  .card_read {
    display: flex;
    align-items: center;

    span {
      margin-left: 10px;
    }

    .el-button {
      border: none;
      border-radius: 5px;
      background: #d9d9d9;
      color: #fff;
    }

    .el-button--primary {
      background: #52c41a;
    }
  }
}
</style>
