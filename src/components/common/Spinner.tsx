import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid black;
  border-top: 2px solid transparent;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
  margin: 0 auto;
`;

export default Spinner;
