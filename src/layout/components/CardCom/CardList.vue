<script lang="ts" setup>
import CardItem from "@/layout/components/CardCom/CardItem.vue";
import { PropType } from "vue";
import { ListType } from "@/types/data";

defineOptions({
  name: "CardList"
});
const props = defineProps({
  taskPatrolList: {
    type: Array as PropType<ListType[]>
  },
  span: {
    type: Number,
    default: 4
  }
});
const removeCard = id => {
  const index = props.taskPatrolList.findIndex(item => item.id === id);
  // eslint-disable-next-line vue/no-mutating-props
  props.taskPatrolList.splice(index, 1);
};
</script>

<template>
  <el-col :span="span" v-for="item in taskPatrolList" :key="item.id">
    <card-item @removeCard="removeCard" :item="item" />
  </el-col>
</template>

<style lang="scss" scoped></style>
