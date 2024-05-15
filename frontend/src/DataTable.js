import React from "react";
import styled from "styled-components";

const DataTable = ({ nodeData }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Temperatura</th>
          <th>Humedad Suelo</th>
          <th>Humedad</th>
          <th>Estado Suelo</th>
          <th>Estado Humedad</th>
          <th>Fecha y Hora</th>
        </tr>
      </thead>
      <tbody>
        {nodeData.map((item, index) => (
          <tr key={index}>
            <td>{item.temperatura}</td>
            <td>{item.humedad_suelo}</td>
            <td>{item.humedad}</td>
            <td>{item.estado_suelo}</td>
            <td>{item.estado_humedad}</td>
            <td>{item.fecha_hora}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
  }
`;

export default DataTable;
