// src/components/MisDatos.tsx
import styled from "styled-components";
import { FiEdit2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getUserById, updateUserById } from "@/services/userService";
import { User } from "@/types/User";

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
  display: grid;
  grid-template-columns: 1fr 2fr auto;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const Label = styled.span`
  color: #201f22;
  font-weight: 500;
  
`;

const Input = styled.input`
  flex: 2;
  padding: 0.5rem;
  border: none;
  font-size: 0.95rem;
  color: #333;

   &:focus {
    font-size: 0.95rem;
    outline: none;
`;

const EditIcon = styled(FiEdit2)`
  color: #aaa;
  cursor: pointer;

  &:hover {
    color: #201f22;
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

export default function MisDatos() {
  const [user, setUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

    if (token && userId) {
      getUserById(userId, token).then((data) => {
        if (data) {
          setUser(data);
          setForm(data);
        }
      });
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");
    if (token && userId && form) {
      try {
        const updated = await updateUserById(userId, token, form);
        setUser(updated);
        setEditing(false);
      } catch (err) {
        console.error("Error actualizando usuario", err);
      }
    }
  };

  if (!user || !form) return null;

  return (
    <Container>
      <Header>Tus datos</Header>
      <Row>
        <Label>Email</Label>
        {editing ? (
          <Input name="email" value={form.email} onChange={handleChange} />
        ) : (
          <span>{user.email}</span>
        )}
        <EditIcon size={16} onClick={() => setEditing(true)} />
      </Row>
      <Row>
        <Label>Nombre</Label>
        {editing ? (
          <Input name="firstname" value={form.firstname} onChange={handleChange} />
        ) : (
          <span>{user.firstname}</span>
        )}
        <EditIcon size={16} onClick={() => setEditing(true)} />
      </Row>
      <Row>
        <Label>Apellido</Label>
        {editing ? (
          <Input name="lastname" value={form.lastname} onChange={handleChange} />
        ) : (
          <span>{user.lastname}</span>
        )}
        <EditIcon size={16} onClick={() => setEditing(true)} />
      </Row>
      <Row>
        <Label>CUIT</Label>
        {editing ? (
          <Input name="dni" value={form.dni} onChange={handleChange} />
        ) : (
          <span>{user.dni}</span>
        )}
        <EditIcon size={16} onClick={() => setEditing(true)} />
      </Row>
      <Row>
        <Label>Teléfono</Label>
        {editing ? (
          <Input name="phone" value={form.phone} onChange={handleChange} />
        ) : (
          <span>{user.phone}</span>
        )}
        <EditIcon size={16} onClick={() => setEditing(true)} />
      </Row>
      <Row>
        <Label>Contraseña</Label>
        {editing ? (
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        ) : (
          <span>******</span>
        )}
        <EditIcon size={16} onClick={() => setEditing(true)} />
      </Row>
      {editing && <SaveButton onClick={handleSave}>Guardar cambios</SaveButton>}
    </Container>
  );
}
