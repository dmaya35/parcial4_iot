import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactSpeedometer from "react-d3-speedometer";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const HomeUser = ({ userHome }) => {
  const [sensorData, setSensorData] = useState({}); // Inicializar el estado sensorData como un objeto vacío
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3030/datos/${userHome}`
        );

        if (response.data && response.data.length > 0) {
          const latestData = response.data.slice(-1)[0]; // Obtener el último registro
          setSensorData(latestData); // Asignar el último registro al estado sensorData
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000); // Intervalo de actualización cada 5 segundos
    return () => clearInterval(intervalId);
  }, [userHome]);

  const handleLogout = () => {
    navigate("/"); // Redirigir al usuario a la página de inicio de sesión
  };

  return (
    <Container>
      <LogoutButton onClick={handleLogout}>Cerrar sesión</LogoutButton>
      <Title>Cliente # {userHome}</Title>
      <ContentWrapper>
        <Section>
          <InfoLabel>Temperatura:</InfoLabel>
          <SpeedometerWrapper>
            <ReactSpeedometer
              maxValue={100}
              value={sensorData.temperatura || 0} // Asignar el valor de temperatura del estado sensorData
              needleColor="#FF5733"
              startColor="#FF5733"
              segments={5}
              endColor="#FF5733"
            />
          </SpeedometerWrapper>
        </Section>
        <Section>
          <InfoLabel>Humedad del suelo:</InfoLabel>
          <SpeedometerWrapper>
            <ReactSpeedometer
              maxValue={100}
              value={sensorData.humedad_suelo || 0} // Asignar el valor de humedad del suelo del estado sensorData
              needleColor="#FF5733"
              startColor="#FF5733"
              segments={5}
              endColor="#FF5733"
            />
          </SpeedometerWrapper>
          <InfoValue>Estado: {sensorData.estado_suelo}</InfoValue>
        </Section>
        <Section>
          <InfoLabel>Humedad:</InfoLabel>
          <SpeedometerWrapper>
            <ReactSpeedometer
              maxValue={100}
              value={sensorData.humedad || 0} // Asignar el valor de humedad del estado sensorData
              needleColor="#007BFF"
              startColor="#007BFF"
              segments={5}
              endColor="#007BFF"
            />
          </SpeedometerWrapper>
          <InfoValue>Estado: {sensorData.estado_humedad}</InfoValue>
        </Section>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  background-color: #e6f2ff;
  padding: 20px;
  font-family: Arial, sans-serif;
  height: 100vh;
  overflow-y: auto;
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

const Title = styled.h2`
  color: #343a40;
  margin-bottom: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const InfoLabel = styled.p`
  font-weight: bold;
  margin-bottom: 8px;
  color: black;
`;

const InfoValue = styled.p`
  font-size: 18px;
`;

const SpeedometerWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default HomeUser;

