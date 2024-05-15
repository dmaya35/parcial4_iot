import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import lockIcon from "./img/lock-icon.png"; // Importar el ícono de candado

const Login = ({ setUserRole, setUserHome }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5050/auth/login", {
        username,
        password,
      });
      const home = response.data.nodo;
      console.log(home);
      console.log("Inicio de sesión exitoso:", response.data);
      setUserHome(home);
      setUserRole(response.data.rol);
      navigate("/home"); // Redirige al usuario a la página de inicio correspondiente
    } catch (error) {
      console.error(
        "Error al iniciar sesión:",
        error.response?.data?.error || "Error desconocido"
      );
      setError(error.response?.data?.error || "Error desconocido");
    }
  };

  return (
    <CenteredContainer>
      <StyledImage src={lockIcon} alt="Ícono de candado" />
      <CustomH3>
        Este es el parcial 4 sobre el Riego de plantas tipo vivero. Desarrollado
        por Diego Maya Perea. En este parcial se manejaron dos nodos y usuarios;
        uno de ellos real (capturado por el esp32) y el otro simulado por otro
        cliente como mqttx. También un usuario admin, el cual puede acceder a la
        informacion general de los usuarios.
      </CustomH3>
      <LoginForm onSubmit={handleSubmit}>
        <FormField>
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormField>
        <FormField>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormField>
        <SubmitButton type="submit">Iniciar sesión</SubmitButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginForm>
    </CenteredContainer>
  );
};

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const StyledImage = styled.img`
  width: 170px; /* Tamaño del ícono */
  height: auto; /* Para mantener la proporción */
  margin-bottom: 20px; /* Espacio adicional después del ícono */
`;

const CustomH3 = styled.h3`
  font-family: "Arial", sans-serif;
  font-size: 16px;
  font-weight: normal;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 20px;
  color: #555;
`;

const LoginForm = styled.form`
  width: 320px;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  text-align: center;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;

  label {
    margin-bottom: 8px;
    color: #777;
  }

  input {
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
  }
`;

const SubmitButton = styled.button`
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 16px;
  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  margin-top: 12px;
  color: #ff4444;
  font-size: 14px;
`;

export default Login;
