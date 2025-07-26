import styled from "styled-components";
import MisDatos from "./components/MisDatos";
import GestionarMediosPago from "./components/GestionarMediosPago";
import CvuAliasCard from "./components/CvuAliasCard";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// 🟡 AGREGAR ESTO:
type Props = {
  setActiveSection: (section: string) => void;
};

export default function ProfileInfo({ setActiveSection }: Props) {
  return (
    <Wrapper>
      <MisDatos />
      <GestionarMediosPago onClick={() => setActiveSection("tarjetas")} />
      <CvuAliasCard />
    </Wrapper>
  );
}