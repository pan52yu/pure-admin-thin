<script lang="ts" setup>
import ArrowRight from "@iconify-icons/ep/arrow-right-bold";
defineOptions({
  name: "MyFavorites"
});
</script>

<template>
  <div class="favorites">
    <IconifyIconOffline :icon="ArrowRight" />
    <span>收藏夹</span>
  </div>
</template>

<style lang="scss" scoped>
.favorites {
  position: absolute;
  width: 50px;
  height: 155px;
  left: 0;
  top: 393px;
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  background: #595959;
  z-index: 1000;
  cursor: pointer;
  writing-mode: vertical-rl; /* 竖向从右向左 */
  text-orientation: upright; /* 保持文字方向正常 */
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    margin-top: 10px;
  }
}
</style>
