import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import styled from "styled-components";

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
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  
`;

const FormControl = styled.div`
  display: flex;
  flex-direction: column;
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
    &:focus {
      border-color: #c1fd35;
    }
  }
`;

const FullWidth = styled.div`
  grid-column: span 2;
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
  const [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    focus: "" as "number" | "name" | "expiry" | "cvc" | "",
  });

  const { number, name, expiry, cvc, focus } = cardData;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setCardData({ ...cardData, focus: e.target.name as typeof focus });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if ([number, name, expiry, cvc].includes("")) return;
    setCardData({ number: "", name: "", expiry: "", cvc: "", focus: "" });
    onCancel();
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
