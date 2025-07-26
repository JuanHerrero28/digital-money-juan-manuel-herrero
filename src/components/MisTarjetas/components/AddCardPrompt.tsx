// src/components/AddCardPrompt.tsx
import styled from "styled-components";
import { FiArrowRight, FiPlus } from "react-icons/fi";

const Wrapper = styled.div`
  background-color: #201f22;
  color: white;
  border-radius: 8px;
  padding: 1.5rem;
  min-height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 0.95;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
`;

const Label = styled.span`
  font-size: 0.8rem;
  color: #ccc;
`;

const Action = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #c1fd35;
  font-weight: 600;
  font-size: 1rem;
`;

export default function AddCardPrompt({ onClick }: { onClick?: () => void }) {
  return (
    <Wrapper onClick={onClick}>
      <Left>
        <Label>Agregá tu tarjeta de débito o crédito</Label>
        <Action>
          <FiPlus size={24} />
          Nueva tarjeta
        </Action>
      </Left>
      <FiArrowRight size={24} />
    </Wrapper>
  );
}
