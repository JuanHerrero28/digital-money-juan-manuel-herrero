import { usePagarServicios } from "@/context/PagarServiciosContext";
import styled from "styled-components";
import { useAtom } from "jotai";
import { accountIdAtom, tokenAtom } from "@/state/sessionAtoms";
import { useEffect, useState } from "react";
import { obtenerTarjetas } from "@/services/cardService";
import { Tarjeta } from "@/types/Tarjeta";
import { FiCheckCircle } from "react-icons/fi";

const Wrapper = styled.div`
  padding: 2rem;
  width: 100%;
`;

const SuccessBox = styled.div`
  background-color: #c1fd35;
  padding: 1.5rem;
  text-align: center;
  border-radius: 12px;
  font-size: 1.3rem;
  font-weight: 600;
  color: #201f22;
  display: flex;
  flex-direction: column;
  align-items: center;
`;



const InfoBox = styled.div`
  background-color: #201f22;
  color: white;
  padding: 1.5rem;
  margin-top: 2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Label = styled.span`
  font-size: 0.95rem;
  color: #ccc;
`;

const GreenText = styled.span`
  color: #c1fd35;
  font-size: 1.4rem;
  font-weight: 600;
`;

const ServicioText = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  color: #c1fd35;
`;

const TarjetaText = styled.div`
  font-size: 0.95rem;
`;

const Actions = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const ButtonGray = styled.button`
  background-color: #e0e0e0;
  color: #201f22;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
`;

const ButtonGreen = styled.button`
  background-color: #c1fd35;
  color: #201f22;
  border: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
`;

export default function PagoExitoso() {
  const { servicioNombre, monto, tarjetaId, resetFlujo } = usePagarServicios();

  const [accountId] = useAtom(accountIdAtom);
  const [token] = useAtom(tokenAtom);
  const [ultimosDigitos, setUltimosDigitos] = useState<string>("****");

  useEffect(() => {
    const fetchTarjetas = async () => {
      if (!token || !accountId || !tarjetaId) return;
      const tarjetas = await obtenerTarjetas(token, accountId);
      const tarjetaSeleccionada = tarjetas.find(
        (t: Tarjeta) => t.id === tarjetaId
      );
      const ultimos = String(tarjetaSeleccionada?.number_id ?? "").slice(-4);
      setUltimosDigitos(ultimos || "****");
    };

    fetchTarjetas();
  }, [token, accountId, tarjetaId]);

  const fechaHora = new Date().toLocaleString("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <Wrapper>
      <SuccessBox>
        <FiCheckCircle size={32} />
        Ya realizaste tu pago
      </SuccessBox>

      <InfoBox>
        <Label>{fechaHora}</Label>
        <GreenText>${monto.toFixed(2)}</GreenText>
        <Label>Para</Label>
        <ServicioText>{servicioNombre}</ServicioText>
        <Label>Tarjeta</Label>
        <TarjetaText>Visa ********{ultimosDigitos}</TarjetaText>
      </InfoBox>

      <Actions>
        <ButtonGray onClick={resetFlujo}>Ir al inicio</ButtonGray>
        <ButtonGreen onClick={() => alert("📄 Simular descarga comprobante")}>
          Descargar comprobante
        </ButtonGreen>
      </Actions>
    </Wrapper>
  );
}
