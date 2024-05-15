import React from "react";
import ReactApexChart from "react-apexcharts";

const HumidityFloorChart = ({ nodeData }) => {
  const humedad_sueloData = nodeData.map((dataItem) => dataItem);
  console.log("Datos de humedad suelo:", humedad_sueloData);

  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
    },
    series: [
      {
        name: "Humedad del suelo (%)",
        data: humedad_sueloData.map((dataItem) => dataItem.humedad_suelo),
      },
    ],
    xaxis: {
      categories: humedad_sueloData.map((dataItem) => dataItem.fecha_hora),
    },
    yaxis: {
      title: {
        text: "Humedad del suelo (%)",
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

export default HumidityFloorChart;
