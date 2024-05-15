import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import DataTable from "./DataTable";
import TemperatureChart from "./TemperatureChart";
import HumidityChart from "./HumidityChart";
import HumidityFloorChart from "./HumidityFloorChart";

const HomeAdmin = () => {
  const [selectedNode, setSelectedNode] = useState("");
  const [nodeData, setNodeData] = useState([]);
  const navigate = useNavigate();

  // Función para cargar los últimos cinco registros del nodo seleccionado
  const loadNodeData = async (nodeId) => {
    try {
      const response = await axios.get(`http://localhost:3030/datos/${nodeId}`);
      // Ordenar los datos por fecha y hora en orden descendente
      const sortedData = response.data.sort(
        (a, b) => new Date(b.fecha_hora) - new Date(a.fecha_hora)
      );
      // Tomar los primeros cinco registros
      const latestData = sortedData.slice(0, 5);
      setNodeData(latestData);
    } catch (error) {
      console.error("Error al cargar datos del nodo:", error);
      setNodeData([]);
    }
  };

  // Manejar cambios en la selección del nodo
  const handleNodeChange = (event) => {
    const nodeId = event.target.value;
    setSelectedNode(nodeId);
    loadNodeData(nodeId);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <Container>
      <Title>Administrar Nodos</Title>
      <LogoutButton onClick={handleLogout}>Cerrar sesión</LogoutButton>
      <NodeSelection>
        <label>Seleccionar Nodo:</label>
        <select value={selectedNode} onChange={handleNodeChange}>
          <option value="">Seleccionar Nodo</option>
          <option value="1">Nodo 1</option>
          <option value="2">Nodo 2</option>
        </select>
      </NodeSelection>
      {nodeData.length > 0 && (
        <ContentWrapper>
          <DataTable nodeData={nodeData} />
          <ChartsWrapper>
            <ChartWrapper>
              <h3>Gráfico de Temperatura</h3>
              <TemperatureChart nodeData={nodeData} />
            </ChartWrapper>
            <ChartWrapper>
              <h3>Gráfico de Humedad</h3>
              <HumidityChart nodeData={nodeData} />
            </ChartWrapper>
            <ChartWrapper>
              <h3>Gráfico de Humedad del Suelo</h3>
              <HumidityFloorChart nodeData={nodeData} />
            </ChartWrapper>
          </ChartsWrapper>
        </ContentWrapper>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
  background-color: #e6f2ff; /* Utilizar el mismo fondo que en HomeUser */
`;

const Title = styled.h2`
  color: #343a40;
  margin-bottom: 20px;
`;

const NodeSelection = styled.div`
  margin-bottom: 20px;

  label {
    margin-right: 10px;
  }

  select {
    padding: 8px;
    font-size: 16px;
  }
`;

const LogoutButton = styled.button`
  position: absolute;
  top: 10px;
  right: 20px;
  padding: 8px 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ContentWrapper = styled.div`
  margin-top: 20px;
`;

const ChartsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChartWrapper = styled.div`
  flex: 1;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;

  h3 {
    margin-bottom: 10px;
  }
`;

export default HomeAdmin;
