import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const ActionButton = styled.button`
  background-color: #c1fd35;
  color: #201f22;
  font-weight: 600;
  padding: 1rem;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  flex: 1;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
  }
`;

interface ActionButtonsProps {
  setActiveSection: (section: string) => void;
}

export default function ActionButtons({ setActiveSection }: ActionButtonsProps) {
  return (
    <ButtonContainer>
      <ActionButton onClick={() => setActiveSection("CargarDinero")}>Cargar dinero</ActionButton>
      <ActionButton onClick={() => setActiveSection("pagarServicios")}>Pago de servicios</ActionButton>
    </ButtonContainer>
  );
}
