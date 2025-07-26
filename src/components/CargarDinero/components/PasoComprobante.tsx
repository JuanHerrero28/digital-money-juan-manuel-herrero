"use client";

import styled from "styled-components";
import { useMoneyLoad } from "@/context/MoneyLoadContext";
import { useRouter } from "next/navigation";
import { FiCheckCircle } from "react-icons/fi";
import jsPDF from "jspdf";

const Container = styled.div`
  background-color: #201f22;
  color: white;
  border-radius: 8px;
  padding: 1.5rem;
`;

const SuccessBanner = styled.div`
  background-color: #c1fd35;
  color: #201f22;
  border-radius: 8px;
  padding: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  justify-content: center;
`;

const Label = styled.p`
  margin: 0.5rem 0;
  font-size: 1rem;
`;

const Bold = styled.span`
  font-weight: 700;
  color: #c1fd35;
`;

const Box = styled.div`
  background-color: #0c0c0c;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1rem;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Button = styled.button<{ primary?: boolean }>`
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  background-color: ${({ primary }) => (primary ? "#c1fd35" : "#d9d9d9")};
  color: ${({ primary }) => (primary ? "#201f22" : "#201f22")};

  &:hover {
    opacity: 0.85;
  }
`;

export default function PasoComprobante() {
  const {
    amount,
    userCvu,
    destinationCvu,
    resetSteps,
    loadMethod
  } = useMoneyLoad();

  const router = useRouter();

  const now = new Date();
  const fecha = now.toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const hora = now.toLocaleTimeString("es-AR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleVolverInicio = () => {
    resetSteps();
    router.push("/dashboard");
  };

  const handleDescargar = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Comprobante de operación", 20, 20);

    doc.setFontSize(12);
    doc.text(`Fecha: ${fecha}`, 20, 40);
    doc.text(`Hora: ${hora}`, 20, 50);
    doc.text(`Monto: $${amount}`, 20, 60);
    doc.text(
      `Tipo: ${loadMethod === "card" ? "Depósito con tarjeta" : "Transferencia bancaria"}`,
      20,
      70
    );

    doc.text("Destino:", 20, 90);
    if (loadMethod === "card") {
      doc.text(`Cuenta propia - CVU: ${userCvu}`, 20, 100);
    } else {
      doc.text(`Cuenta externa - CVU: ${destinationCvu}`, 20, 100);
    }

    doc.save("comprobante.pdf");
  };

  return (
    <>
      <SuccessBanner>
        <FiCheckCircle size={32} />
        {loadMethod === "card"
          ? "Ya cargamos el dinero en tu cuenta"
          : "Transferiste tu dinero correctamente"}
      </SuccessBanner>

      <Container>
        <Box>
          <Label>{fecha} a las {hora} hs.</Label>
          <Label><Bold>${amount}</Bold></Label>
          <Label>Para</Label>
          <Label>
            <Bold>
              {loadMethod === "card" ? "Cuenta propia" : "Cuenta externa"}
            </Bold>
          </Label>
          <Label>{loadMethod === "card" ? "Brubank" : "Otro banco"}</Label>
          <Label>
            CVU: {loadMethod === "card" ? userCvu : destinationCvu}
          </Label>
        </Box>

        <Buttons>
          <Button onClick={handleVolverInicio}>Ir al inicio</Button>
          <Button primary onClick={handleDescargar}>Descargar comprobante</Button>
        </Buttons>
      </Container>
    </>
  );
}
