import {
  ChartsEvents,
  chartsOptions,
  LineECOption
} from "@/components/MyEcharts";
import { onMounted } from "vue";

export const useContentDistribution = () => {
  const options = chartsOptions<LineECOption>({
    xAxis: {},
    yAxis: {
      type: "value"
    },
    series: []
  });
  const init = () => {
    //   走请求
    options.xAxis = {
      type: "category",
      boundaryGap: false,
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    };
    options.series = [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        areaStyle: {}
      }
    ];
  };
  const selectchanged = (params: ChartsEvents.Events["selectchanged"]) => {
    console.log(params, "选中图例了");
  };

  const handleChartClick = (params: string) => {
    console.log(params, "点击了图表");
  };
  onMounted(() => {
    init();
  });
  return {
    options,
    selectchanged,
    handleChartClick
  };
};
