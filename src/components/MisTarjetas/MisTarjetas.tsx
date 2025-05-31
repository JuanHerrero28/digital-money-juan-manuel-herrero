import styled from "styled-components";
import AddCardPrompt from "./components/AddCardPrompt";
import CardForm from "./components/CardForm";
import { useState } from "react";
import ActivityCards from "./components/ActivityCards";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function MisTarjetas() {
  const [formVisible, setFormVisible] = useState(false);
  return (
    <Wrapper>
     {!formVisible ? (
        <AddCardPrompt onClick={() => setFormVisible(true)} />
      ) : (
        <CardForm onCancel={() => setFormVisible(false)} />
      )}
      <ActivityCards/>
    </Wrapper>
  );
}