import styled from "styled-components";
import { FiXCircle } from "react-icons/fi";
import { usePagarServicios } from "@/context/PagarServiciosContext";

const Wrapper = styled.div`
  background-color: #201f22;
  color: white;
  padding: 3rem;
  border-radius: 12px;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
`;

const IconoError = styled(FiXCircle)`
  color: red;
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Titulo = styled.h2`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
`;

const Texto = styled.p`
  color: #ccc;
  font-size: 1rem;
  line-height: 1.5;
`;

const Linea = styled.hr`
  border: none;
  height: 1px;
  background-color: #444;
  margin: 2rem 0;
`;

const Boton = styled.button`
  margin-top: 2rem;
  background-color: #c1fd35;
  color: #201f22;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #b6f821;
  }
`;

export default function PagoFallido() {
  const { resetFlujo } = usePagarServicios(); // ✅ usamos resetFlujo

  return (
    <Wrapper>
      <IconoError />
      <Titulo>Hubo un problema con tu pago</Titulo>
      <Linea />
      <Texto>
        Puede deberse a fondos insuficientes<br />
        Comunicate con la entidad emisora de la tarjeta
      </Texto>
      <Boton onClick={resetFlujo}>Volver a intentarlo</Boton>
    </Wrapper>
  );
}
