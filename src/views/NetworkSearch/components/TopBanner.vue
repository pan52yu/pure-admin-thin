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
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 214px;
  background: url(@/assets/imgs/right_banner.png) no-repeat right; /* 设置 top_banner 的背景图 */
  background-size: contain;
  color: #ffffff;

  .banner_title {
    margin-left: 75px;
    margin-right: 105px;
    line-height: 40px;
    font-weight: 700;
    font-size: 30px;
  }

  .center_banner {
    flex: 1;
    height: 214px;
  }
}

.right_banner {
  height: 213px;
  background: none; /* 设置 right_banner 的背景图为 none */
}
</style>
