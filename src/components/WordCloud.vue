<template>
  <div>
    <div id="wordCloud" ref="wordCloud" style="height: 450px; width: 1160px" />
  </div>
</template>
<script lang="ts" setup>
import "echarts-wordcloud";
import echarts from "@/plugins/echarts";
import { ref, onMounted } from "vue";

defineOptions({
  name: "WordCloud"
});
const wordCloud = ref(null);
const echartsData = ref([
  { value: "30", name: "行动" },
  { value: "29", name: "农民" },
  { value: "28", name: "集合" },
  { value: "27", name: "牺牲" },
  { value: "26", name: "警察" },
  { value: "25", name: "冲突" },
  { value: "24", name: "无能" },
  { value: "23", name: "暴力" },
  { value: "22", name: "赌博" },
  { value: "21", name: "死亡" },
  { value: "20", name: "拆迁" },
  { value: "16", name: "交警" },
  { value: "15", name: "不公平" },
  { value: "14", name: "冷漠" },
  { value: "13", name: "老百姓" },
  { value: "12", name: "爆炸" },
  { value: "11", name: "不和" },
  { value: "10", name: "犯罪" },
  { value: "9", name: "残忍" }
]);
const initChart = () => {
  const myChart = echarts.init(wordCloud.value);
  const option = {
    title: {
      text: "",
      x: "center"
    },
    backgroundColor: "#fff",
    // tooltip: {
    //   pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
    // },
    series: [
      {
        type: "wordCloud",
        //用来调整词之间的距离
        gridSize: 20,
        //用来调整字的大小范围
        // Text size range which the value in data will be mapped to.
        // Default to have minimum 12px and maximum 60px size.
        sizeRange: [50, 80],
        // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
        //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
        // rotationRange: [-45, 0, 45, 90],
        // rotationRange: [ 0,90],
        rotationRange: [0, 0],
        //随机生成字体颜色
        // maskImage: maskImage,
        textStyle: {
          color: function () {
            return (
              "rgb(" +
              Math.round(Math.random() * 255) +
              ", " +
              Math.round(Math.random() * 255) +
              ", " +
              Math.round(Math.random() * 255) +
              ")"
            );
          }
        },
        //位置相关设置
        // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
        // Default to be put in the center and has 75% x 80% size.
        left: "center",
        top: "center",
        right: null,
        bottom: null,
        width: "100%",
        height: "100%",
        //数据
        data: echartsData.value
      }
    ]
  };
  myChart.setOption(option);
  // 点击某个字
  myChart.on("click", function (params) {
    console.log("myChart----click---:", params, "------", params.data);
  });
};
onMounted(() => {
  initChart();
});
</script>
