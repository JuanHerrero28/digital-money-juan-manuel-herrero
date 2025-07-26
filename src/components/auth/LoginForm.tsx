import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/router";
import Spinner from "../common/Spinner";
import { useSetAtom } from "jotai";
import { depositsAtom } from "@/state/depositAtoms";

const Title = styled.h2`
  font-size: 16pt;
  font-weight: 500;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Subtitle = styled.h3`
  font-size: 16pt;
  font-weight: 500;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Container = styled.div`
  background-color: #201f22;
  color: white;
  padding: 2rem;
  min-height: calc(100vh - 128px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 360px;
`;

const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  max-width: 360px;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 2px solid ${({ hasError }) => (hasError ? "#D43333" : "transparent")};
  border-radius: 6px;
  background-color: white;
  color: black;

  &::placeholder {
    color: #555;
  }

  &:focus {
    outline: none;
    border: 2px solid #c1fd35;
  }
`;

const ToggleIcon = styled.span`
  position: absolute;
  top: 50%;
  right: 14px;
  transform: translateY(-80%);
  cursor: pointer;
  color: #555;
  font-size: 1rem;
`;

const Button = styled.button`
  width: 100%;
  max-width: 360px;
  padding: 0.75rem;
  font-weight: 600;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  margin-bottom: 1rem;
  background-color: #c1fd35;
  color: #201f22;
  font-weight: 600;

  &:hover {
    opacity: 0.9;
  }
`;

const SecondaryButton = styled(Button)`
  background-color: #f2f1f1;
  color: black;
`;

const ErrorMessage = styled.p`
  color: #d43333;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

export default function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hideCreateAccount, setHideCreateAccount] = useState(false);

  const { mutate: login, isPending, error } = useLogin();

  useEffect(() => {
    const fromRegister = localStorage.getItem("fromRegister");
    if (fromRegister === "true") {
      setHideCreateAccount(true);
      localStorage.removeItem("fromRegister");
    }
  }, []);

  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleContinue = () => {
    if (!validateEmail(email)) {
      setLocalError("Ingresá un correo válido.");
      return;
    }
    setLocalError("");
    setStep(2);
  };

  const setDeposits = useSetAtom(depositsAtom);

  const handleLogin = () => {
    if (!password) {
      setLocalError("Ingresá tu contraseña.");
      return;
    }
    setLocalError("");
    login(
      { email, password },
      {
        onSuccess: () => {
          setDeposits([]);
          router.push("/dashboard");
        },
      }
    );
  };

  return (
    <Container>
      {step === 1 ? (
        <>
          <Title>¡Hola! Ingresá tu e-mail</Title>
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            hasError={!!localError}
          />
          {localError && <ErrorMessage>{localError}</ErrorMessage>}
          <Button onClick={handleContinue}>Continuar</Button>
          {!hideCreateAccount && (
            <SecondaryButton onClick={() => router.push("/register")}>
              Crear cuenta
            </SecondaryButton>
          )}
        </>
      ) : (
        <>
          <Subtitle>Ingresá tu contraseña</Subtitle>
          <InputWrapper>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              hasError={!!localError || !!error}
            />
            <ToggleIcon onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </ToggleIcon>
          </InputWrapper>
          {(localError || error) && (
            <ErrorMessage>
              {localError || "Credenciales incorrectas"}
            </ErrorMessage>
          )}
          <Button onClick={handleLogin} disabled={isPending}>
            {isPending ? <Spinner /> : "Iniciar sesión"}
          </Button>
        </>
      )}
    </Container>
  );
}
