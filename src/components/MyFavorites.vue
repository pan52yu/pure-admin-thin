<script lang="ts" setup>
import ArrowRight from "@iconify-icons/ep/arrow-right-bold";
import ArrowLeft from "@iconify-icons/ep/arrow-left-bold";
import { onMounted, ref } from "vue";
import CardItem from "@/layout/components/CardCom/CardItem.vue";
import { useFavorites } from "@/store/modules/favorites";

defineOptions({
  name: "MyFavorites"
});
const isOpen = ref(false);
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
const favorite = useFavorites();
onMounted(() => {
  favorite.setFavoritesList("");
});
</script>

<template>
  <div class="favorites">
    <div
      class="fav_close fav_animation fav_fix"
      v-if="!isOpen"
      @click="isOpen = !isOpen"
    >
      <IconifyIconOffline :icon="ArrowRight" />
      <span>收藏夹</span>
    </div>
    <div class="fav_open fav_animation" v-else>
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
      <div
        class="fav_open_item"
        v-for="item in favorite.favoritesList"
        :key="item.id"
      >
        <card-item :item="item" img-height="120px" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.favorites {
  position: absolute;
  left: 0;
  top: 35vh;
  z-index: 997;
  min-width: 50px;
  background: #f5f5f5;
  line-height: 50px;
  font-size: 20px;

  .fav_animation {
    transition: width 3s ease-in-out;
  }

  .fav_close {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 155px;
    background: #595959;
    cursor: pointer;
    writing-mode: vertical-rl; /* 竖向从右向左 */
    color: #fff;
    text-orientation: upright; /* 保持文字方向正常 */

    span {
      margin-top: 20px;
    }
  }

  .fav_open {
    overflow-y: scroll;
    position: fixed;
    top: 100px;
    width: 230px;
    height: 85vh;
    background: #f5f5f5;
    transition: all 0.2s ease-in-out;

    &_title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      width: 230px;
      height: 50px;
      background: #595959;
      color: #fff;

      svg {
        cursor: pointer;
        font-size: 24px;
      }

      .center {
        font-weight: 700;
        font-size: 20px;
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
        width: 50px;
        cursor: pointer;
        font-size: 14px;
        color: #1890ff;
      }
    }

    &_item {
      padding: 0 10px;

      ::v-deep(.card_info) {
        margin-bottom: 16px;

        p {
          margin: 0;
          height: 20px;
        }

        .card_user,
        .card_detail {
          margin: 0;
          height: 28px;
        }
      }
    }
  }
}

.fav_fix {
  position: fixed;
}
</style>
