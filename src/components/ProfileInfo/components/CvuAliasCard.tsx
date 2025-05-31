import styled from "styled-components";
import { FiCopy, FiCheck } from "react-icons/fi";
import { useState } from "react";

const Card = styled.div`
  background-color: #201f22;
  color: white;
  border-radius: 8px;
  padding: 1.5rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
`;

const Column = styled.div``;

const Label = styled.p`
  color: #c1fd35;
  font-weight: bold;
  margin: 0;
`;

const Value = styled.p`
  color: #d1d1d1;
  margin: 0.25rem 0 0;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #c1fd35;
  font-size: 1.25rem;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

export default function CvuAliasCard() {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (value: string, field: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000); // volver al ícono anterior después de 2s
  };

  const cvu = "0000002100075320000000";
  const alias = "estealiasnoexiste";

  return (
    <Card>
      <p style={{ marginBottom: "1.5rem", fontSize: "0.9rem" }}>
        Copiá tu cvu o alias para ingresar o transferir dinero desde otra cuenta
      </p>

      <Row>
        <Column>
          <Label>CVU</Label>
          <Value>{cvu}</Value>
        </Column>
        <IconButton onClick={() => handleCopy(cvu, "cvu")}>
          {copiedField === "cvu" ? <FiCheck /> : <FiCopy />}
        </IconButton>
      </Row>

      <Row>
        <Column>
          <Label>Alias</Label>
          <Value>{alias}</Value>
        </Column>
        <IconButton onClick={() => handleCopy(alias, "alias")}>
          {copiedField === "alias" ? <FiCheck /> : <FiCopy />}
        </IconButton>
      </Row>
    </Card>
  );
}
