import styled from "styled-components";
import { FiCopy, FiCheck, FiEdit2 } from "react-icons/fi";
import { useState, useEffect } from "react";
import { getAccount, updateAlias } from "@/services/accountService";
import { useSetAtom } from "jotai";
import { userCvuAtom } from "@/state/sessionAtoms";

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

const Input = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid #c1fd35;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
  }
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

const SaveButton = styled.button`
  margin-top: 1rem;
  background-color: #c1fd35;
  color: #201f22;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

// Agregamos las props
interface CvuAliasCardProps {
  onCopyCvu?: () => void;
  onCopyAlias?: () => void;
}

export default function CvuAliasCard({ onCopyCvu, onCopyAlias }: CvuAliasCardProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [account, setAccount] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [alias, setAlias] = useState("");
  const setUserCvu = useSetAtom(userCvuAtom);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    getAccount(token).then((data) => {
      if (data) {
        setAccount(data);
        setAlias(data.alias);
         setUserCvu(data.cvu);
      }
    });
  }, []);

  const handleCopy = (value: string, field: string) => {
    navigator.clipboard.writeText(value);
    setCopiedField(field);
    if (field === "cvu" && onCopyCvu) onCopyCvu();
    if (field === "alias" && onCopyAlias) onCopyAlias();

    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSaveAlias = async () => {
    const token = localStorage.getItem("token");
    if (!token || !account) return;

    try {
      const updated = await updateAlias(account.id, token, alias);
      setAccount(updated);
      setAlias(updated.alias);
      setEditing(false);
    } catch (err) {
      console.error("No se pudo actualizar el alias");
    }
  };

  if (!account) return null;

  return (
    <Card>
      <p style={{ marginBottom: "1.5rem", fontSize: "0.9rem" }}>
        Copiá tu CVU o alias para ingresar o transferir dinero desde otra cuenta
      </p>

      <Row>
        <Column>
          <Label>CVU</Label>
          <Value>{account.cvu}</Value>
        </Column>
        <IconButton onClick={() => handleCopy(account.cvu, "cvu")}>
          {copiedField === "cvu" ? <FiCheck /> : <FiCopy />}
        </IconButton>
      </Row>

      <Row>
        <Column>
          <Label>Alias</Label>
          {editing ? (
            <Input value={alias} onChange={(e) => setAlias(e.target.value)} />
          ) : (
            <Value>{account.alias}</Value>
          )}
        </Column>

        <div style={{ display: "flex", gap: "0.5rem" }}>
          {!editing && (
            <IconButton onClick={() => handleCopy(account.alias, "alias")}>
              {copiedField === "alias" ? <FiCheck /> : <FiCopy />}
            </IconButton>
          )}
          <IconButton onClick={() => setEditing(!editing)}>
            <FiEdit2 />
          </IconButton>
        </div>
      </Row>

      {editing && (
        <SaveButton onClick={handleSaveAlias}>Guardar Alias</SaveButton>
      )}
    </Card>
  );
}
