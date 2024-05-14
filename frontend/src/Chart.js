import React from "react";
import ReactApexChart from "react-apexcharts";

const Chart = ({ nodeData }) => {
  const labels = nodeData.map((dataItem) => new Date(dataItem.Fecha_Hora).toLocaleString());
  const temperaturaData = nodeData.map((dataItem) => dataItem.Temperatura);
  const humedad_sueloData = nodeData.map((dataItem) => dataItem.Humedad_suelo);
  const humedadData = nodeData.map((dataItem) => dataItem.Humedad);

  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
    },
    series: [
      {
        name: "Temperatura (°C)",
        data: temperaturaData,
      },
      {
        name: "Humedad del suelo (%)",
        data: humedad_sueloData,
      },
      {
        name: "Humedad (%)",
        data: humedadData,
      },
    ],
    xaxis: {
      categories: labels,
    },
    yaxis: [
      {
        title: {
          text: "Temperatura (°C)",
        },
      },
      {
        opposite: true,
        title: {
          text: "Humedad del suelo (%)",
        },
      },
      {
        opposite: true,
        title: {
          text: "Humedad (%)",
        },
      },
    ],
  };

  return (
    <div>
      <ReactApexChart options={chartOptions} series={chartOptions.series} type="line" height={350} />
    </div>
  );
};

export default Chart;
