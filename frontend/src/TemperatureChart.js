import React from "react";
import ReactApexChart from "react-apexcharts";

const TemperatureChart = ({ nodeData }) => {
  const temperaturaData = nodeData.map((dataItem) => dataItem);
  console.log("Datos de temperatura:", temperaturaData);

  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
    },
    series: [
      {
        name: "Temperatura (°C)",
        data: temperaturaData.map((dataItem) => dataItem.temperatura),
      },
    ],
    xaxis: {
      categories: temperaturaData.map((dataItem) => dataItem.fecha_hora),
    },
    yaxis: {
      title: {
        text: "Temperatura (°C)",
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

export default TemperatureChart;
