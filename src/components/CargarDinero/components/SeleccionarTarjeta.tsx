import { useMoneyLoad } from "@/context/MoneyLoadContext";
import { useQuery } from "@tanstack/react-query";
import { obtenerTarjetas } from "@/services/cardService";
import { useAtom } from "jotai";
import { accountIdAtom, tokenAtom } from "@/state/sessionAtoms";
import { FiArrowRight } from "react-icons/fi";
import styled from "styled-components";
import { toast } from "react-toastify";
import { Tarjeta } from "@/types/Tarjeta";


// --- Styled Components (igual que antes) ---
const Container = styled.div`
  background-color: #201f22;
  color: white;
  border-radius: 8px;
  padding: 1.5rem;
`;

const Header = styled.span`
  color: #f4f4f4;
  font-size: 1.3rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  margin-top: 1.5rem;
`;

const Item = styled.li`
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #c1fd35;
`;

const Description = styled.span`
  font-size: 0.95rem;
  color: #201f22;
`;

const Radio = styled.input`
  accent-color: #c1fd35;
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

// --- Skeleton Component ---
const SkeletonItem = styled(Item)`
  background-color: #ddd;
  animation: pulse 1.5s infinite ease-in-out;
  height: 48px;

  @keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
  }
`;

export default function SeleccionarTarjeta() {
  const [accountId] = useAtom(accountIdAtom);
  const [token] = useAtom(tokenAtom);
  const { selectedCard, setSelectedCard, nextStep } = useMoneyLoad();

  const {
    data: tarjetas,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tarjetas"],
    queryFn: () => obtenerTarjetas(token!, accountId!),
  });

  const handleSelect = (card: Tarjeta) => {
  const parsedCard = {
    id: card.id,
    number_id: Number(card.number_id),
    first_last_name: card.first_last_name,
    expiration_date: card.expiration_date,
    cod: Number(card.cod),
  };
  setSelectedCard(parsedCard);
};

  const handleContinue = () => {
    if (!selectedCard) {
      toast.error("Por favor, seleccioná una tarjeta antes de continuar.");
      return;
    }
    nextStep();
  };

  return (
    <>
      <Container>
        <Header>Seleccionar tarjeta</Header>
        <List>
          {isLoading ? (
            <>
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
            </>
          ) : error ? (
            <p>Error al cargar tarjetas.</p>
          ) : Array.isArray(tarjetas) && tarjetas.length > 0 ? (
            tarjetas.map((item: Tarjeta) => (
              <Item key={item.id}>
                <Left>
                  <Circle />
                  <Description>
                    Terminada en {String(item.number_id).slice(-4)}
                  </Description>
                </Left>
                <Radio
                  type="radio"
                  checked={selectedCard?.id === item.id}
                  onChange={() => handleSelect(item)}
                />
              </Item>
            ))
          ) : (
            <p>No tenés tarjetas asociadas.</p>
          )}
        </List>
      </Container>
      <Wrapper3 onClick={handleContinue}>
        <Action2>Continuar</Action2>
        <FiArrowRight size={24} color="black" />
      </Wrapper3>
    </>
  );
}
