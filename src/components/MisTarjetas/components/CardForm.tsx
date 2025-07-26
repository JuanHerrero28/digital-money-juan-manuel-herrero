import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import styled from "styled-components";
import { crearTarjeta } from "@/services/cardService";
import { useAtom } from "jotai";
import { accountIdAtom, tokenAtom } from "@/state/sessionAtoms";
import { toast } from 'react-toastify';
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { obtenerTarjetas } from "@/services/cardService";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  gap: 2rem;
`;

const CardContainer = styled.div`
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
  display: flex;
  justify-content: center;

  .rccs {
    width: 100%;
    height: auto;
    overflow: hidden;
  }

  .rccs__expiry__valid {
    display: none;
  }
`;

const Form = styled.form`
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; // 🔸 Cada input ocupa el 100%
  }
`;


const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  label {
    font-size: 0.85rem;
    font-weight: 500;
    color: #201f22;
    margin-bottom: 0.4rem;
  }
  input {
    border: 1px solid #d0d0d0;
    padding: 0.6rem 0.75rem;
    border-radius: 6px;
    font-size: 1rem;
    color: #201f22;
    background-color: white;
    outline: none;
    width: 100%;

    &:focus {
      border-color: #c1fd35;
    }
  }
`;

const FullWidth = styled.div`
  grid-column: span 2;

  @media (max-width: 768px) {
    grid-column: span 1;
  }
`;

const SubmitButton = styled.button`
  background-color: #c1fd35;
  color: #201f22;
  padding: 1rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  margin-top: 1rem;
  &:hover {
    opacity: 0.95;
  }
`;

export default function CardForm({ onCancel }: { onCancel: () => void }) {
  const queryClient = useQueryClient();
  const [accountId] = useAtom(accountIdAtom); // ✅ LEE DESDE ÁTOMOS
  const [token] = useAtom(tokenAtom);
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "" as "number" | "name" | "expiry" | "cvc" | "",
  });

  const {
  data: tarjetas,
  
} = useQuery({
  queryKey: ["tarjetas"],
  queryFn: () => obtenerTarjetas(token!, accountId!),
  enabled: !!token && !!accountId,
});

  const { number, name, expiry, cvc, focus } = cardData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setCardData({ ...cardData, focus: e.target.name as typeof focus });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

     if (tarjetas && tarjetas.length >= 10) {
    toast.error("Solo se permiten hasta 10 tarjetas registradas.");
    return;
  }

    if (!number || !name || !expiry || !cvc) {
    toast.error("Todos los campos son obligatorios");
    return;
  }

  if (!/^\d{16}$/.test(number)) {
    toast.error("El número de tarjeta debe tener 16 dígitos");
    return;
  }

  if (name.trim().length < 5) {
    toast.error("Ingresá el nombre y apellido completo");
    return;
  }

    if (!/^\d{4}$/.test(expiry)) {
      toast.error("La fecha de vencimiento debe tener 4 dígitos (MMYY), por ejemplo: 0825");
      return;
    }

    const month = parseInt(expiry.slice(0, 2), 10);
    if (month < 1 || month > 12) {
      toast.error("El mes de vencimiento debe estar entre 01 y 12");
      return;
    }

    if (!token || !accountId) {
      toast.error("Sesión expirada. Volvé a iniciar sesión.");
      return;
    }

    try {
      const result = await crearTarjeta(token, accountId, {
        number,
        name,
        expiry,
        cvc,
      });

       toast.success("🎉 Tarjeta cargada con éxito", result);
       queryClient.invalidateQueries({ queryKey: ['tarjetas'] });

      setCardData({ number: "", name: "", expiry: "", cvc: "", focus: "" });
      onCancel();
    } catch (error) {
      console.error("Error creando tarjeta:", error);
    }
  };
  

  return (
    <Container>
      <CardContainer>
        <Cards
          number={number}
          name={name}
          expiry={expiry}
          cvc={cvc}
          focused={focus === "cvc" ? "number" : focus}
        />
      </CardContainer>
      <Form onSubmit={handleSubmit}>
        {/* campos */}
        <FormControl>
          <label htmlFor="number">Número de la tarjeta*</label>
          <input
            type="text"
            name="number"
            value={number}
            maxLength={16}
            pattern="\d*"
            inputMode="numeric"
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,16}$/.test(value)) {
                setCardData({ ...cardData, number: value });
              }
            }}
            onFocus={handleInputFocus}
          />
        </FormControl>

        <FormControl>
          <label htmlFor="name">Nombre y apellido*</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        </FormControl>

        <FormControl>
          <label htmlFor="expiry">Fecha de vencimiento*</label>
          <input
            type="text"
            name="expiry"
            value={expiry}
            maxLength={4}
            pattern="\d*"
            inputMode="numeric"
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,4}$/.test(value)) {
                setCardData({ ...cardData, expiry: value });
              }
            }}
            onFocus={handleInputFocus}
          />
        </FormControl>

        <FormControl>
          <label htmlFor="cvc">Código de seguridad*</label>
          <input
            type="text"
            name="cvc"
            value={cvc}
            maxLength={3}
            pattern="\d*"
            inputMode="numeric"
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,3}$/.test(value)) {
                setCardData({ ...cardData, cvc: value });
              }
            }}
            onFocus={handleInputFocus}
          />
        </FormControl>

        <FullWidth>
          <SubmitButton type="submit">Continuar</SubmitButton>
        </FullWidth>
      </Form>
    </Container>
  );
}
