<script setup lang="ts">
defineOptions({
  name: "NetworkSearch"
});
</script>

<template>
  <div class="favorites">收藏夹</div>
  <div class="network_search">
    <router-view />
  </div>
</template>

<style scoped lang="scss">
.network_search {
  position: relative;

  .favorites {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
