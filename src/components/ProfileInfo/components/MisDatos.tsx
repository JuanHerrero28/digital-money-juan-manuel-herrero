// src/components/MisDatos.tsx
import styled from "styled-components";
import { FiEdit2 } from "react-icons/fi";

const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const Header = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  flex: 1;
  color: #201f22;
`;

const Value = styled.span`
  flex: 2;
  color: #777;
  font-size: 0.95rem;
`;

const EditIcon = styled(FiEdit2)`
  color: #aaa;
  cursor: pointer;

  &:hover {
    color: #201f22;
  }
`;

const userData = [
  { label: "Email", value: "mauriciobrito@digitalhouse.com" },
  { label: "Nombre y apellido", value: "Mauricio Brito" },
  { label: "CUIT", value: "20352069798" },
  { label: "Teléfono", value: "1146730989" },
  { label: "Contraseña", value: "******" },
];

export default function MisDatos() {
  return (
    <Container>
      <Header>Tus datos</Header>
      {userData.map((item, idx) => (
        <Row key={idx}>
          <Label>{item.label}</Label>
          <Value>{item.value}</Value>
          <EditIcon size={16} />
        </Row>
      ))}
    </Container>
  );
}
