import styled from "styled-components";
import InfoCard from "./components/InfoCard";

const HeroContainer = styled.section`
  width: 100%;
  min-height: 100vh;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    padding: 1.5rem;
    text-align: left;
    height: 900px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    background-image: url("/assets/img-fond-mobile.png");
    flex-direction: column;
    padding: 1rem;
    text-align: left;
    height: 820px;
  }
`;

const HeroTextBlock = styled.div`
  position: absolute;
  top: 10%;
  left: 2rem;
  max-width: 418px;

  h1 {
    color: white;
    margin-bottom: 0.5rem;
  }

  .separator {
    display: none;
    height: 3px;
    width: 60px;
    background-color: #c1fd35;
    margin: 1rem 0;
  }

  p {
    color: #c1fd35;
    font-size: 20pt;
    font-weight: 400;

    span {
      font-weight: 600;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    position: static;
    margin-top: 2rem;
    left: 0;
    max-width: 100%;

    .separator {
      display: block;
    }
    h1 {
      color: white;
      margin-bottom: 0.5rem;
      font-size: 28pt;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 300px;
    h1 {
      font-size: 23pt;
    }
  }
`;

const CardWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2rem;
  z-index: 2;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: center;
    bottom: 40px;
    width: 100%;
    padding: 0 1rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
    bottom: 30px;
    width: 90%;
  }
`;

const GreenBackground = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 160px;
  background-color: #c1fd35;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    height: 240px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    height: 340px;
  }
`;

export default function Hero() {
  return (
    <HeroContainer>
      <HeroTextBlock>
        <h1>De ahora en adelante, hacés más con tu dinero</h1>
        <div className="separator" />
        <p>
          Tu nueva <span>billetera virtual</span>
        </p>
      </HeroTextBlock>

      <CardWrapper>
        <InfoCard
          title="Transferí dinero"
          description="Desde Digital Money House vas a poder transferir dinero a otras cuentas, así como también recibir transferencias y nuclear tu capital en nuestra billetera virtual"
        />
        <InfoCard
          title="Pago de servicios"
          description="Pagá mensualmente los servicios en 3 simples clicks. Fácil, rápido y conveniente. Olvidate de las facturas en papel"
        />
      </CardWrapper>

      <GreenBackground />
    </HeroContainer>
  );
}
