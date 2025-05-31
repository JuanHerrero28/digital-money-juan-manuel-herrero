import styled from "styled-components";
import MisDatos from "./components/MisDatos";
import GestionarMediosPago from "./components/GestionarMediosPago";
import CvuAliasCard from "./components/CvuAliasCard";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function ProfileInfo() {
  return (
    <Wrapper>
      <MisDatos/>
      <GestionarMediosPago/>
      <CvuAliasCard/>
    </Wrapper>
  );
}