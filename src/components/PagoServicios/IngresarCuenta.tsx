// src/components/PagarServicios/IngresarCuenta.tsx
import { useState } from "react";
import styled from "styled-components";
import { usePagarServicios } from "@/context/PagarServiciosContext";
import { toast } from "react-toastify";

const Container = styled.div`
  background-color: #201f22;
  color: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  margin: 4rem auto;
  text-align: center;
  min-height: 300px;
`;

const Title = styled.h2`
  color: #c1fd35;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 8px;
  width: 100%;
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #c1fd35;
  }

  
`;

const Description = styled.p`
  font-size: 0.85rem;
  color: #ccc;
`;

const Button = styled.button`
  background-color: #c1fd35;
  color: #201f22;
  font-weight: bold;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  margin-top: 1rem;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

export default function IngresarCuenta() {
  const { cuenta, setCuenta, avanzarPaso } = usePagarServicios();
  const [inputValue, setInputValue] = useState(cuenta);

  const handleContinuar = () => {
    const valorSinEspacios = inputValue.trim();
    if (valorSinEspacios.length !== 11 || isNaN(Number(valorSinEspacios))) {
      toast.error("El número de cuenta debe tener exactamente 11 dígitos.");
      return;
    }

    setCuenta(valorSinEspacios);
    avanzarPaso();
  };

  return (
    <Container>
      <Title>Número de cuenta sin el primer 2</Title>
      <Input
        type="text"
        maxLength={11}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value.replace(/\D/g, ""))}
        placeholder="Ej: 37289701912"
      />
      <Description>
        Son 11 números sin espacios, sin el 2 inicial. Agregá ceros adelante si tenés menos.
      </Description>
      <ButtonWrapper>
  <Button onClick={handleContinuar}>Continuar</Button>
</ButtonWrapper>
    </Container>
  );
}
