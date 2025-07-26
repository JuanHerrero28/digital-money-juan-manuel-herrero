import styled from "styled-components";
import { FiArrowRight } from "react-icons/fi";

const Container = styled.button`
  background-color: #c1fd35;
  color: #201f22;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: #b6f821;
  }
`;

const Text = styled.span``;

type Props = {
  onClick: () => void;
};

export default function GestionarMediosPago({ onClick }: Props) {
  return (
    <Container onClick={onClick}>
      <Text>Gestioná los medios de pago</Text>
      <FiArrowRight size={20} />
    </Container>
  );
}
