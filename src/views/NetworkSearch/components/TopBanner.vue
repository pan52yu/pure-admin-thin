<script setup lang="ts">
import SearchTabs from "./SearchTabs.vue";
defineOptions({
  name: "TopBanner"
});
</script>

<template>
  <div style="background: #001a5c">
    <div class="top_banner">
      <div class="right_banner" />
      <div class="banner_title">全网实时速搜</div>
      <div class="center_banner">
        <search-tabs />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.top_banner {
  width: 100%;
  height: 214px;
  color: #ffffff;
  background: url(@/assets/imgs/right_banner.png) no-repeat right; /* 设置 top_banner 的背景图 */
  background-size: contain;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .banner_title {
    font-weight: 700;
    font-size: 30px;
    line-height: 40px;
    margin-left: 75px;
    margin-right: 105px;
  }
  .center_banner {
    height: 214px;
    flex: 1;
  }
}

.right_banner {
  height: 213px;
  background: none; /* 设置 right_banner 的背景图为 none */
}
</style>
