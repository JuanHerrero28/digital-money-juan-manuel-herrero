import styled from "styled-components";

const Wrapper = styled.div`
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  color: #201f22;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

export default function Actividad() {
  return (
    <Wrapper>
      <h2>Actividad</h2>
      <p>Sección en blanco para testear navegación.</p>
    </Wrapper>
  );
}