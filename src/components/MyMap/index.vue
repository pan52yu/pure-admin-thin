<script lang="ts" setup>
import AMapLoader from "@amap/amap-jsapi-loader";
import { onMounted, ref, shallowRef, watch } from "vue";
import markThePoint from "@/assets/imgs/biaojidian.png";

defineOptions({
  name: "MyMap"
});
const props = defineProps({
  id: {
    type: Number,
    default: 0
  },
  item: {
    type: Object,
    default: () => ({
      zoom: 12,
      center: [120.211503, 30.209629],
      radius: 4000
    })
  },
  //   标记点是否可拖拽
  draggable: {
    type: Boolean,
    default: false
  },
  //   圆形覆盖物是否可编辑
  editable: {
    type: Boolean,
    default: false
  }
});
const map = shallowRef(null);
// 监听zoom变化 重新设置地图缩放级别
watch(
  () => props.item.zoom,
  newVal => {
    if (map.value) {
      map.value.setZoom(newVal);
    }
  }
);
// 监听radius变化 重新设置地图覆盖物半径
watch(
  () => props.item.radius,
  newVal => {
    if (circle.value) {
      circle.value.setRadius(newVal);
    }
  }
);
const marker = ref(null);
const circle = ref(null);
const circleEditor = ref(null);
const initMap = () => {
  AMapLoader.load({
    key: "2f972cab8a8f075d436d3eccd410dffe", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.CircleEditor"] // 加载EditableCircle插件
  })
    .then(AMap => {
      map.value = new AMap.Map(`map-${props.id}`, {
        //设置地图容器id
        viewMode: "3D", //是否为3D地图模式
        zoom: props.item.zoom, //初始化地图级别
        center: props.item.center //初始化地图中心点位置
      });
      // 添加标记点
      marker.value = new AMap.Marker({
        position: props.item.center,
        map: map.value,
        draggable: props.draggable //设置标记点可拖拽
      });
      marker.value.setIcon(
        new AMap.Icon({
          size: new AMap.Size(35, 35), // 图标尺寸
          image: markThePoint,
          imageSize: new AMap.Size(35, 35) // 根据所设置的大小拉伸或压缩图片
        })
      );
      // 监听标记点移动事件，重新设置圆形覆盖物位置
      marker.value.on("dragend", event => {
        const { lng, lat } = event.lnglat;
        circle.value.setCenter([lng, lat]);
      });
      // 添加圆形覆盖物
      circle.value = new AMap.Circle({
        center: props.item.center, // 圆心位置
        radius: props.item.radius, // 单位：米
        strokeColor: "#F33", //线颜色
        strokeOpacity: 0, //线透明度
        strokeWeight: 3, //线粗细度
        fillColor: "#ffa6a6", //填充颜色
        fillOpacity: 0.35 //填充透明度
      });
      circle.value.setMap(map.value);
      // 圆形覆盖物可编辑
      if (props.editable) {
        circleEditor.value = new AMap.CircleEditor(map, circle);
        circle.value.on("click", function () {
          circleEditor.value.open();
        });
        // 取消编辑模式
        map.value.on("click", function () {
          circleEditor.value.close();
        });
        // 在圆形覆盖物编辑模式下监听圆心位置变化，更新标记点位置
        circleEditor.value.on("move", () => {
          const center = circle.value.getCenter();
          marker.value.setPosition(center);
        });
      }
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
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
