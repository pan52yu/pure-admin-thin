<script lang="ts" setup>
import { ListType } from "@/types/data";
import { onMounted, PropType, ref } from "vue";
import { useSearchTabs } from "@/store/modules/searchTabs";
import ItemCard from "@/views/NetworkSearch/components/ItemCard.vue";
defineOptions({
  name: "ResultCard"
});

const props = defineProps({
  haveSkeleton: {
    type: Boolean,
    default: false
  },
  cardList: {
    type: Array as PropType<ListType[]>,
    default: () => []
  }
});
const useSeacchTab = useSearchTabs();
const cardListRef = ref<ListType[]>([]);
onMounted(() => {
  cardListRef.value = JSON.parse(JSON.stringify(props.cardList));
  const newCardItem = {
    url: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200/200`,
    title: `Title1`,
    loading: true,
    avatar: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/50/50`,
    name: `User`,
    dianzan: Math.floor(Math.random() * 100),
    pinglun: Math.floor(Math.random() * 100),
    zhuanfa: Math.floor(Math.random() * 100),
    time: "2023-03-09 10:42:34",
    favoriteStatus: false,
    animation: true,
    id: Math.floor(Math.random() * 100)
  };
  const newCardItem2 = {
    url: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/200/200`,
    title: `Title1`,
    loading: true,
    avatar: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/50/50`,
    name: `User`,
    dianzan: Math.floor(Math.random() * 100),
    pinglun: Math.floor(Math.random() * 100),
    zhuanfa: Math.floor(Math.random() * 100),
    time: "2023-03-09 10:42:34",
    favoriteStatus: false,
    animation: true,
    id: Math.floor(Math.random() * 100)
  };
  setTimeout(() => {
    cardListRef.value.unshift(JSON.parse(JSON.stringify(newCardItem)));
  }, 2000);
  setTimeout(() => {
    cardListRef.value.unshift(JSON.parse(JSON.stringify(newCardItem2)));
  }, 4000);
});
</script>
<template>
  <el-row :gutter="20">
    <el-col :span="8" v-if="haveSkeleton && !useSeacchTab.endOfCountdown">
      <el-skeleton animated>
        <template #template>
          <el-skeleton-item
            variant="image"
            style="width: 200px; height: 250px"
          />
          <div>
            <el-skeleton-item variant="p" style="width: 80%" />
            <el-skeleton-item variant="p" style="width: 80%" />
            <el-skeleton-item variant="p" style="width: 60%" />
          </div>
        </template>
      </el-skeleton>
    </el-col>
    <el-col :span="8" v-for="item in cardListRef" :key="item.id">
      <item-card :item="item" />
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped></style>
