import { useMoneyLoad } from "@/context/MoneyLoadContext";
import CvuAliasCard from "../ProfileInfo/components/CvuAliasCard";
import SeleccionarTarjeta from "./components/SeleccionarTarjeta";
import IngresarMonto from "./components/IngresarMonto";
import PasoResumen from "./components/PasoResumen";
import styled from "styled-components";
import { BiTransfer } from "react-icons/bi";
import { FiArrowRight, FiCreditCard, FiArrowLeft } from "react-icons/fi";
import { useState } from "react";
import { toast } from "react-toastify";
import PasoComprobante from "./components/PasoComprobante";

const Wrapper = styled.div`
  background-color: #201f22;
  color: white;
  border-radius: 8px;
  padding: 1.5rem;
  min-height: 130px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 0.95;
  }
`;
const Wrapper2 = styled.div`
  background-color: #201f22;
  color: white;
  border-radius: 8px;
  padding: 1.5rem;
  min-height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 0.95;
  }
`;
const Wrapper3 = styled.div`
  background-color: #c1fd35;
  color: white;
  border-radius: 8px;
  padding: 1.5rem;
  min-height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 0.74;
  }
`;

const Action2 = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #201f22;
  font-weight: 600;
  font-size: 1rem;
`;
const Action = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #c1fd35;
  font-weight: 600;
  font-size: 1rem;
`;

const Label = styled.span`
  font-size: 1.3rem;
  color: #201f22;
`;

export default function CargarDineroSteps() {
  const { step, nextStep, prevStep, loadMethod, setLoadMethod } =
    useMoneyLoad();

  const [cvuCopied, setCvuCopied] = useState(false);
  const [aliasCopied, setAliasCopied] = useState(false);

  const handleContinueBank = () => {
    if (!cvuCopied && !aliasCopied) {
      toast.warning("Debés copiar el CVU o el alias para continuar");
      return;
    }
    nextStep();
  };

  if (step === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Label>¿Cómo querés cargar dinero?</Label>

        <Wrapper
          onClick={() => {
            setLoadMethod("bank");
            nextStep();
          }}
        >
          <Action>
            <BiTransfer size={24} />
            Transferencia bancaria
          </Action>
          <FiArrowRight size={24} />
        </Wrapper>
        <Wrapper
          onClick={() => {
            setLoadMethod("card");
            nextStep();
          }}
        >
          <Action>
            <FiCreditCard size={24} />
            Seleccionar tarjeta
          </Action>
          <FiArrowRight size={24} />
        </Wrapper>
      </div>
    );
  }

  if (loadMethod === "bank") {
    if (step === 1) {
      return (
        <>
          <Wrapper2 onClick={prevStep}>
            <Action>Volver</Action>
            <FiArrowLeft size={24} />
          </Wrapper2>

          <CvuAliasCard
            onCopyCvu={() => setCvuCopied(true)}
            onCopyAlias={() => setAliasCopied(true)}
          />

          <Wrapper3 onClick={handleContinueBank}>
            <Action2>Continuar</Action2>
            <FiArrowRight size={24} color="black" />
          </Wrapper3>
        </>
      );
    }

    if (step === 2) {
      return (
        <>
          <Wrapper2 onClick={prevStep}>
            <Action>Volver</Action>
            <FiArrowLeft size={24} />
          </Wrapper2>

          <IngresarMonto />
        </>
      );
    }

    if (step === 3) {
      return (
        <>
          <Wrapper2 onClick={prevStep}>
            <Action>Volver</Action>
            <FiArrowLeft size={24} />
          </Wrapper2>

          <PasoResumen />
        </>
      );
    }
  }

  if (loadMethod === "card") {
    if (step === 1) {
      return (
        <>
          <Wrapper2 onClick={prevStep}>
            <Action>Volver</Action>
            <FiArrowLeft size={24} />
          </Wrapper2>
          <SeleccionarTarjeta />
        </>
      );
    }

    if (step === 2) {
      return (
        <>
          <Wrapper2 onClick={prevStep}>
            <Action>Volver</Action>
            <FiArrowLeft size={24} />
          </Wrapper2>
          <IngresarMonto />
        </>
      );
    }

    if (step === 3) {
      return (
        <>
          <Wrapper2 onClick={prevStep}>
            <Action>Volver</Action>
            <FiArrowLeft size={24} />
          </Wrapper2>
          <PasoResumen />
        </>
      );
    }
  }

  if (step === 4) {
  return <PasoComprobante />;
}

  return null;
}