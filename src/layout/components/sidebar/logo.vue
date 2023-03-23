<script setup lang="ts">
import { useNav } from "@/layout/hooks/useNav";

const props = defineProps({
  collapse: Boolean
});

const { title } = useNav();
</script>

<template>
  <div class="sidebar-logo-container" :class="{ collapses: props.collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="props.collapse"
        key="props.collapse"
        :title="title"
        class="sidebar-logo-link"
        to="/"
      >
        <img src="/logo.svg" alt="logo" />
        <span class="sidebar-title">{{ title }}</span>
      </router-link>
      <router-link
        v-else
        key="expand"
        :title="title"
        class="sidebar-logo-link"
        to="/"
      >
        <img src="/logo.svg" alt="logo" />
        <span class="sidebar-title">{{ title }}</span>
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-logo-container {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: 48px;

  .sidebar-logo-link {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    height: 100%;

    img {
      display: inline-block;
      height: 32px;
    }

    .sidebar-title {
      display: inline-block;
      overflow: hidden;
      margin: 2px 0 0 12px;
      height: 32px;
      line-height: 32px;
      text-overflow: ellipsis;
      font-weight: 600;
      font-size: 18px;
      color: $subMenuActiveText;
      white-space: nowrap;
    }
  }
}
</style>
