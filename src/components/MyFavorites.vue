<script lang="ts" setup>
import ArrowRight from "@iconify-icons/ep/arrow-right-bold";
import ArrowLeft from "@iconify-icons/ep/arrow-left-bold";
import { ref } from "vue";
import { useWindowScroll } from "@vueuse/core";
import { ListType } from "@/types/data";
import CardItem from "@/layout/components/CardCom/CardItem.vue";

defineOptions({
  name: "MyFavorites"
});
const isOpen = ref(false);
const { y } = useWindowScroll();
console.log(y);
const labelValue = ref("0");
const labelList = [
  {
    label: "全部标签",
    value: "0"
  },
  {
    label: "热门标签",
    value: "1"
  },
  {
    label: "精品标签",
    value: "2"
  }
];
const favoritesList: ListType[] = [];
for (let i = 0; i < 9; i++) {
  const newItem: ListType = {
    url: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200/200`,
    title: `Title ${i + 1}`,
    loading: i % 2 === 0,
    avatar: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/50/50`,
    name: `User ${i + 1}`,
    dianzan: Math.floor(Math.random() * 100),
    pinglun: Math.floor(Math.random() * 100),
    zhuanfa: Math.floor(Math.random() * 100),
    time: "2023-03-09 10:42:34",
    favoriteStatus: i % 2 === 0,
    id: Math.floor(Math.random() * 100)
  };
  favoritesList.push(newItem);
}
</script>

<template>
  <div class="favorites">
    <div class="fav_close" v-if="!isOpen" @click="isOpen = !isOpen">
      <IconifyIconOffline :icon="ArrowRight" />
      <span>收藏夹</span>
    </div>
    <div class="fav_open" v-else>
      <div class="fav_open_title">
        <IconifyIconOffline :icon="ArrowLeft" @click="isOpen = !isOpen" />
        <div class="center">收藏夹</div>
        <div class="all">全部</div>
      </div>
      <div class="fav_open_label">
        <el-select
          v-model="labelValue"
          class="m-2"
          placeholder="Select"
          size="large"
        >
          <el-option
            v-for="item in labelList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <span>管理</span>
      </div>
      <div class="fav_open_item" v-for="item in favoritesList" :key="item.id">
        <card-item :item="item" img-height="120px" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.favorites {
  position: absolute;
  left: 0;
  top: 360px;
  min-width: 50px;
  font-size: 20px;
  line-height: 50px;
  background: #f5f5f5;
  z-index: 1000;

  .fav_close {
    height: 155px;
    color: #fff;
    background: #595959;
    display: flex;
    align-items: center;
    justify-content: center;
    writing-mode: vertical-rl; /* 竖向从右向左 */
    text-orientation: upright; /* 保持文字方向正常 */
    cursor: pointer;

    span {
      margin-top: 20px;
    }
  }

  .fav_open {
    width: 230px;

    &_title {
      width: 230px;
      height: 50px;
      color: #fff;
      background: #595959;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;

      svg {
        cursor: pointer;
        font-size: 24px;
      }

      .center {
        font-size: 20px;
        font-weight: 700;
      }

      .all {
        cursor: pointer;
        font-size: 14px;
        color: #fff;
      }
    }

    &_label {
      display: flex;
      align-items: center;

      span {
        display: inline-block;
        font-size: 14px;
        width: 50px;
        color: #1890ff;
        cursor: pointer;
      }
    }

    &_item {
      padding: 0 10px;

      ::v-deep(.card_info) {
        margin-bottom: 16px;

        p {
          height: 20px;
          margin: 0;
        }

        .card_user,
        .card_detail {
          height: 28px;
          margin: 0;
        }
      }
    }
  }
}
</style>
