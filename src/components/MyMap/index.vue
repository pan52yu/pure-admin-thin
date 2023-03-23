<script lang="ts" setup>
import AMapLoader from "@amap/amap-jsapi-loader";
import { onMounted, shallowRef } from "vue";
import { EmergencyType } from "@/types/data";

defineOptions({
  name: "MyMap"
});
const props = defineProps({
  id: {
    type: Number,
    default: 0
  },
  item: {
    type: Object as PropType<EmergencyType>,
    default: () => ({})
  }
});
const map = shallowRef(null);
const initMap = () => {
  AMapLoader.load({
    key: "2f972cab8a8f075d436d3eccd410dffe", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [""] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then(AMap => {
      map.value = new AMap.Map(`map-${props.id}`, {
        //设置地图容器id
        viewMode: "3D", //是否为3D地图模式
        zoom: props.item.zoom, //初始化地图级别
        center: props.item.center //初始化地图中心点位置
      });
      new AMap.Marker({
        position: props.item.center,
        map: map.value
      });
      const circle = new AMap.Circle({
        center: props.item.center,
        radius: props.item.radius, // 单位：米
        strokeColor: "#F33", //线颜色
        strokeOpacity: 0, //线透明度
        strokeWeight: 3, //线粗细度
        fillColor: "#ffa6a6", //填充颜色
        fillOpacity: 0.35 //填充透明度
      });
      circle.setMap(map.value);
    })
    .catch(e => {
      console.log(e);
    });
};
onMounted(() => {
  initMap();
});
</script>

<template>
  <div ref="map" class="my_map" :id="`map-${props.id}`" />
</template>

<style lang="scss" scoped>
.my_map {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
