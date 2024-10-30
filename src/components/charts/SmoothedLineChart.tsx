import ReactECharts from "echarts-for-react";

const SmoothedLineChart = () => {
  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: "line",
        smooth: true, // this is the only option that changes
      },
    ],
  };

  return <ReactECharts option={option} />;
};

export default SmoothedLineChart;
