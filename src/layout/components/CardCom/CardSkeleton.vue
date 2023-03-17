<script lang="ts" setup>
defineOptions({
  name: "CardSkeleton"
});
</script>

<template>
  <div class="CardSkeleton">
    <el-skeleton animated>
      <template #template>
        <el-skeleton-item variant="image" style="width: 100%; height: 380px" />
        <div>
          <el-skeleton-item variant="p" style="width: 80%" />
          <el-skeleton-item variant="p" style="width: 80%" />
          <el-skeleton-item variant="p" style="width: 60%" />
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<style lang="scss" scoped></style>
