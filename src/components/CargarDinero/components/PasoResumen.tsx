import { useMoneyLoad } from "@/context/MoneyLoadContext";
import styled from "styled-components";
import { FiArrowRight } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  crearDeposito,
  crearTransferencia,
} from "@/services/depositTransferService";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSetAtom } from "jotai";
import { depositsAtom } from "@/state/depositAtoms";

const Container = styled.div`
  background-color: #201f22;
  color: white;
  border-radius: 8px;
  padding: 1.5rem;
`;

const Header = styled.span`
  color: #c1fd35;
  font-size: 1.2rem;
`;

const SubLabel = styled.p`
  margin-top: 1rem;
  font-size: 1rem;
  font-weight: 400;
  color: #ffffff;
`;

const BoldText = styled.span`
  font-weight: 600;
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

const Input = styled.input`
  margin-top: 1rem;
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
  border-radius: 6px;
  border: 2px solid #201f22;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #c1fd35;
  }
`;

export default function PasoResumen() {
  const {
    amount,
    loadMethod,
    selectedCard,
    userCvu,
    nextStep,
    token,
    accountId,
    setLoading,
    setDestinationCvu,
  } = useMoneyLoad();

  const [destinoCvu, setDestinoCvu] = useState("");

  const queryClient = useQueryClient();

  const setDeposits = useSetAtom(depositsAtom);

  const handleConfirm = async () => {
    if (!token || !accountId || amount <= 0) {
      toast.error("Datos incompletos. Verificá e intentá de nuevo.");
      return;
    }

    const fecha = new Date().toISOString();

    try {
      setLoading(true);

      if (loadMethod === "card" && selectedCard) {
        const nuevoDeposito = await crearDeposito(token, accountId, {
          amount,
          dated: fecha,
          origin: "Tarjeta de crédito",
          destination: "Cuenta Digital Money",
        });

        // Guarda el depósito en el estado global para que se muestre en la actividad
        setDeposits((prev) => [...prev, nuevoDeposito]);

        toast.success("Depósito registrado exitosamente");
      } else if (loadMethod === "bank" && userCvu) {
        if (!destinoCvu) {
          toast.error("Ingresá un CVU de destino válido");
          return;
        }

        if (destinoCvu === userCvu) {
          toast.error("No podés transferirte a tu propio CVU");
          return;
        }


        await crearTransferencia(token, accountId, {
          amount: -Math.abs(amount),
          dated: fecha,
          origin: userCvu,
          destination: destinoCvu,
        });

        setDestinationCvu(destinoCvu);

        queryClient.invalidateQueries({ queryKey: ["transfers"] });
      } else {
        toast.error("Faltan datos para continuar la operación.");
        return;
      }

      nextStep();
    } catch {
      toast.error("No posee fondos sufiecientes para realizar la operacion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Container>
        <Header>Revisá que esté todo bien</Header>

        <SubLabel>
          Vas a {loadMethod === "bank" ? "transferir" : "ingresar"}:{" "}
          <BoldText>
            ${amount > 0 ? amount.toLocaleString("es-AR") : "0"}
          </BoldText>
        </SubLabel>

        {loadMethod === "bank" ? (
          <>
            <SubLabel>Desde tu cuenta propia</SubLabel>
            <SubLabel>
              <BoldText>Brubank</BoldText>
              <br />
              CVU: {userCvu ?? "No disponible"}
            </SubLabel>

            <SubLabel>Ingresá el CVU destino:</SubLabel>
            <Input
              type="text"
              placeholder="Ej: 0000003100012345678901"
              value={destinoCvu}
              onChange={(e) => setDestinoCvu(e.target.value)}
            />
          </>
        ) : (
          <>
            <SubLabel>Con tu tarjeta:</SubLabel>
            <SubLabel>
              <BoldText>
                {selectedCard
                  ? `**** **** **** ${String(selectedCard.number_id).slice(-4)}`
                  : "No seleccionada"}
              </BoldText>
            </SubLabel>
            <SubLabel>
              A la cuenta: <BoldText>Digital Money House</BoldText>
            </SubLabel>
          </>
        )}
      </Container>

      <Wrapper3 onClick={handleConfirm}>
        <Action2>Confirmar</Action2>
        <FiArrowRight size={24} color="black" />
      </Wrapper3>
    </>
  );
}
