import React from "react";
import ReactApexChart from "react-apexcharts";

const HumidityChart = ({ nodeData }) => {
  const humedadData = nodeData.map((dataItem) => dataItem);
  console.log("Datos de humedad:", humedadData);

  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
    },
    series: [
      {
        name: "Humedad (%)",
        data: humedadData.map((dataItem) => dataItem.humedad),
      },
    ],
    xaxis: {
      categories: humedadData.map((dataItem) => dataItem.fecha_hora),
    },
    yaxis: {
      title: {
        text: "Humedad (%)",
      },
    },
  };

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={chartOptions.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default HumidityChart;
