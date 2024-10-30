import ReactECharts from "echarts-for-react";

const BasicAreaChart = () => {
  const option = {
    xAxis: {
      type: "category",
      boundaryGap: false, // This is the only difference from BasicLineChart
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        areaStyle: {}, // This is the only difference from BasicLineChart
      },
    ],
  };

  return <ReactECharts option={option} />;
};

export default BasicAreaChart;
