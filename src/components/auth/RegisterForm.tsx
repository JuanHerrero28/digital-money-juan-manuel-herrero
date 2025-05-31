// src/components/RegisterForm.tsx
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import styled from "styled-components";
import { useRegister } from "@/hooks/useRegister";
import { useRouter } from "next/router";
import Image from "next/image";

const Container = styled.div`
  background-color: #201f22;
  color: white;
  padding: 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  background-color: #201f22;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  padding: 2rem;
  border-radius: 8px;
  max-width: 700px;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const TitleSuccess = styled.h3`
  font-size: 30pt;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Title = styled.h3`
  font-size: 16pt;
  font-weight: 500;
  grid-column: span 2;
  text-align: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-column: span 1;
  }
`;

const FullWidth = styled.div`
  grid-column: span 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-column: span 1;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input<{ hasError?: boolean }>`
  padding: 0.75rem;
  border-radius: 6px;
  border: 2px solid ${({ hasError }) => (hasError ? "#D43333" : "transparent")};
  width: 100%;
  background-color: white;

  &:focus {
    outline: none;
    border: 2px solid #c1fd35;
  }
`;

const ToggleIcon = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #555;
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #c1fd35;
  color: #201f22;
  font-weight: 700;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
`;

const ErrorMessage = styled.p`
  color: #d43333;
  font-size: 0.9rem;
  grid-column: span 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-column: span 1;
  }
`;

const SuccessContainer = styled.div`
  text-align: center;
  color: white;

  h2 {
    font-size: 28pt;
    margin-bottom: 1rem;
  }

  p {
    font-size: 12pt;
    margin-bottom: 1.5rem;
  }
`;

const ContinueButton = styled.button`
  background-color: #c1fd35;
  color: #201f22;
  font-weight: 600;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  max-width: 260px;
  width: 100%;
  margin-top: 2rem;
  font-size: 1rem;

  &:hover {
    opacity: 0.9;
  }
`;

const Message = styled.p`
  color: rgb(145, 142, 142);
  max-width: 520px;
  margin-top: 1.5rem;
`;

export default function RegisterForm() {
  const router = useRouter();
  const { mutate: register, isPending } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    email: "",
    password: "",
    confirmPassword: "",
    telefono: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const {
      nombre,
      apellido,
      dni,
      email,
      password,
      confirmPassword,
      telefono,
    } = form;
    if (!nombre || !apellido || !dni || !email || !password || !confirmPassword || !telefono) {
      return "Completa los campos requeridos";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Correo electrónico inválido";
    }
    if (password !== confirmPassword) {
      return "Las contraseñas no coinciden";
    }
    if (!/^.{6,20}$/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "La contraseña debe tener entre 6 y 20 caracteres e incluir al menos un número, una mayúscula y un carácter especial";
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateForm();
    if (err) {
      setError(err);
      return;
    }
    setError("");
    register(
      {
        dni: Number(form.dni),
        email: form.email,
        firstname: form.nombre,
        lastname: form.apellido,
        password: form.password,
        phone: form.telefono,
      },
      {
        onSuccess: (data) => {
          localStorage.setItem("user_id", String(data.user_id));
          localStorage.setItem("email", form.email);
          localStorage.setItem("fromRegister", "true");
          setSuccess(true);
        },
        onError: () => {
          setError("Ocurrió un error al registrar el usuario");
        },
      }
    );
  };

  if (success) {
    return (
      <Container>
        <SuccessContainer>
          <TitleSuccess>Registro Exitoso</TitleSuccess>
          <Image
            src="/assets/Check.svg"
            alt="Registro exitoso"
            width={48}
            height={48}
          />
          <Message>
            Hemos enviado un correo de confirmación para validar tu email, por favor revisalo para iniciar sesión
          </Message>
          <ContinueButton onClick={() => router.push("/login")}>
            Continuar
          </ContinueButton>
        </SuccessContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Title>Crear cuenta</Title>
        <Input
          name="nombre"
          placeholder="Nombre*"
          value={form.nombre}
          onChange={handleChange}
          hasError={!!error && !form.nombre}
        />
        <Input
          name="apellido"
          placeholder="Apellido*"
          value={form.apellido}
          onChange={handleChange}
          hasError={!!error && !form.apellido}
        />
        <Input
          name="dni"
          placeholder="DNI*"
          value={form.dni}
          onChange={handleChange}
          hasError={!!error && !form.dni}
        />
        <Input
          name="email"
          placeholder="Correo electrónico*"
          value={form.email}
          onChange={handleChange}
          hasError={!!error && !form.email}
        />
        <FullWidth>
          <small>
            Usá entre 6 y 20 caracteres (debe contener al menos 1 carácter especial, una mayúscula y un número)
          </small>
        </FullWidth>
        <InputWrapper>
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña*"
            value={form.password}
            onChange={handleChange}
            hasError={!!error && !form.password}
          />
          <ToggleIcon onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </ToggleIcon>
        </InputWrapper>
        <InputWrapper>
          <Input
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmar contraseña*"
            value={form.confirmPassword}
            onChange={handleChange}
            hasError={!!error && !form.confirmPassword}
          />
          <ToggleIcon onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </ToggleIcon>
        </InputWrapper>
        <Input
          name="telefono"
          placeholder="Teléfono*"
          value={form.telefono}
          onChange={handleChange}
          hasError={!!error && !form.telefono}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creando cuenta..." : "Crear cuenta"}
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Form>
    </Container>
  );
}
