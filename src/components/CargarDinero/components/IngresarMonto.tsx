import { useMoneyLoad } from "@/context/MoneyLoadContext";
import { useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import { FiArrowRight } from "react-icons/fi";

const Container = styled.div`
  background-color: #201f22;
  color: white;
  border-radius: 8px;
  padding: 1.5rem;
`;

const Header = styled.span`
  color: #c1fd35;
  font-size: 1.2rem;
`;

const Input = styled.input`
  margin-top: 1.5rem;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  border: 2px solid #201f22;
  font-size: 1rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #c1fd35;
  }
`;

const Wrapper3 = styled.div`
  background-color: #c1fd35;
  color: white;
  border-radius: 8px;
  padding: 1.5rem;
  min-height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 0.74;
  }
`;

const Action2 = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #201f22;
  font-weight: 600;
  font-size: 1rem;
`;

export default function IngresarMonto() {
  const { confirmarCarga } = useMoneyLoad();
  const [inputValue, setInputValue] = useState("0");

  const handleContinue = () => {
    const numericAmount = Number(inputValue);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error("Ingresá un monto válido mayor a $0");
      return;
    }

    confirmarCarga(numericAmount); // ✅ PASÁS el valor ingresado actualizado
  };

  return (
    <>
      <Container>
        <Header>Ingresa el monto</Header>
        <Input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="$0"
          min="1"
        />
      </Container>
      <Wrapper3 onClick={handleContinue}>
        <Action2>Continuar</Action2>
        <FiArrowRight size={24} color="black" />
      </Wrapper3>
    </>
  );
}

