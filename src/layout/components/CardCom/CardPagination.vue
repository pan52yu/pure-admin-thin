<script lang="ts" setup>
import { computed } from "vue";

// 引入element-ui中文包
import zhLocale from "element-plus/lib/locale/lang/zh-cn";

defineOptions({
  name: "CardPagination"
});

// 然后将element-ui中pagination选项改掉
zhLocale.el.pagination = {
  goto: "跳转到",
  pagesize: "/页",
  total: `共 {total} 个视频`,
  pageClassifier: "",
  deprecationWarning: ""
};
const props = defineProps({
  total: {
    required: true,
    type: Number,
    default: 0
  },
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 20
  },
  pageSizes: {
    type: Array,
    default() {
      return [10, 20, 50, 100];
    }
  },
  layout: {
    type: String,
    default: "total,  prev, pager, next, sizes, jumper"
  },
  background: {
    type: Boolean,
    default: true
  },
  autoScroll: {
    type: Boolean,
    default: true
  }
});
const currentPage = computed({
  get() {
    return props.page;
  },
  set(newValue) {
    emit("update:page", newValue);
  }
});
const pageSize = computed({
  get() {
    return props.limit;
  },
  set(newValue) {
    emit("update:limit", newValue);
  }
});

const emit = defineEmits(["pagination", "update:page", "update:limit"]);
const handleSizeChange = val => {
  emit("pagination", { page: currentPage.value, limit: val });
};
const handleCurrentChange = val => {
  emit("pagination", { page: val, limit: pageSize.value });
};
</script>

<template>
  <div class="CardPagination">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      :layout="layout"
      :total="total"
      :background="background"
      v-bind="$attrs"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.CardPagination {
  display: flex;
  justify-content: center;
}
</style>
