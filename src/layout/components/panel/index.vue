<script setup lang="ts">
import { ref, computed } from "vue";
import { emitter } from "@/utils/mitt";
import { onClickOutside } from "@vueuse/core";
import Close from "@iconify-icons/ep/close";

const target = ref(null);
const show = ref<Boolean>(false);

const iconClass = computed(() => {
  return [
    "mr-[20px]",
    "outline-none",
    "width-[20px]",
    "height-[20px]",
    "rounded-[4px]",
    "cursor-pointer",
    "transition-colors",
    "hover:bg-[#0000000f]",
    "dark:hover:bg-[#ffffff1f]",
    "dark:hover:text-[#ffffffd9]"
  ];
});

onClickOutside(target, (event: any) => {
  if (event.clientX > target.value.offsetLeft) return;
  show.value = false;
});

emitter.on("openPanel", () => {
  show.value = true;
});
</script>

<template>
  <div :class="{ show: show }" class="right-panel-container">
    <div class="right-panel-background" />
    <div ref="target" class="right-panel bg-bg_color">
      <div class="right-panel-items">
        <div class="project-configuration">
          <h4 class="dark:text-white">项目配置</h4>
          <span title="关闭配置" :class="iconClass">
            <IconifyIconOffline
              class="dark:text-white"
              width="20px"
              height="20px"
              :icon="Close"
              @click="show = !show"
            />
          </span>
        </div>
        <div
          class="border-b-[1px] border-solid border-[#dcdfe6] dark:border-[#303030]"
        />
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
.showright-panel {
  overflow: hidden;
  position: relative;
  width: calc(100% - 15px);
}
</style>

<style lang="scss" scoped>
.right-panel-background {
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
  background: rgba(0, 0, 0, 0.2);
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);
}

.right-panel {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 40000;
  width: 100%;
  max-width: 315px;
  height: 100vh;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.05);
  transform: translate(100%);
  transition: all 0.25s cubic-bezier(0.7, 0.3, 0.1, 1);
}

.show {
  transition: all 0.3s cubic-bezier(0.7, 0.3, 0.1, 1);

  .right-panel-background {
    z-index: 20000;
    width: 100%;
    height: 100%;
    opacity: 1;
  }

  .right-panel {
    transform: translate(0);
  }
}

.handle-button {
  position: absolute;
  left: -48px;
  top: 45%;
  z-index: 0;
  border-radius: 6px 0 0 6px !important;
  width: 48px;
  height: 48px;
  background: rgb(24, 144, 255);
  cursor: pointer;
  pointer-events: auto;
  line-height: 48px;
  text-align: center;
  font-size: 24px;
  color: #fff;

  i {
    line-height: 48px;
    font-size: 24px;
  }
}

.right-panel-items {
  overflow-y: auto;
  margin-top: 60px;
  height: calc(100vh - 60px);
}

.project-configuration {
  display: flex;
  position: fixed;
  top: 15px;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
  width: 100%;
  height: 30px;
}

:deep(.el-divider--horizontal) {
  margin: 20px auto 0 auto;
  width: 90%;
}
</style>
