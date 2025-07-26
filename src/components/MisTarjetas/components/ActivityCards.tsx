import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { obtenerTarjetas, eliminarTarjeta } from "@/services/cardService";
import { useAtom } from "jotai";
import { accountIdAtom, tokenAtom } from "@/state/sessionAtoms";
import { toast } from 'react-toastify';
import { SkeletonBox } from "@/components/common/Skeleton";
import { Tarjeta } from "@/types/Tarjeta";

import styled from "styled-components";

const ButtonDelete = styled.button`
  background: none;
  border: none;
  color: rgb(78, 78, 78);
  font-weight: 300;
  font-size: 0.9rem;
  cursor: pointer;
  text-align: left;
  padding: 0;

  &:hover {
    color: rgb(14, 14, 14);
  }
`;

const Container = styled.div`
  background-color: white;
  min-height: 290px;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Header = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex: 1;
`;

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
  gap: 1rem;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

const Circle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #c1fd35;
`;

const Description = styled.div`
  font-size: 0.95rem;
  color: #201f22;
`;

const Right = styled.div`
  text-align: right;
`;

export default function ActivityCards() {
  const [accountId] = useAtom(accountIdAtom);
  const [token] = useAtom(tokenAtom);
  const queryClient = useQueryClient();

  

  const {
    data: tarjetas,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tarjetas"],
    queryFn: () => obtenerTarjetas(token, accountId),
  });

  const mutation = useMutation({
    mutationFn: (cardId: number) => eliminarTarjeta(token, accountId, cardId),
    onSuccess: () => {
      toast.success("Tarjeta eliminada con éxito");
      queryClient.invalidateQueries({ queryKey: ["tarjetas"] });
    },
    onError: () => {
      toast.warning("❌ Error al eliminar la tarjeta");
    },
  });

  if (isLoading) {
  return (
    <Container>
      <Header>Tus tarjetas</Header>
      <List>
        {[...Array(5)].map((_, i) => (
          <Item key={i}>
            <Left>
              <SkeletonBox width="20px" height="20px" style={{ borderRadius: "50%" }} />
              <SkeletonBox width="140px" height="20px" />
            </Left>
            <Right>
              <SkeletonBox width="60px" height="20px" />
            </Right>
          </Item>
        ))}
      </List>
    </Container>
  );
}
  if (error) return <p>Error al cargar tarjetas</p>;

  return (
    <Container>
      <Header>Tus tarjetas</Header>
      <List>
        {Array.isArray(tarjetas) && tarjetas.length > 0 ? (
          tarjetas.map((item: Tarjeta) => (
            <Item key={item.id}>
              <Left>
                <Circle />
                <Description>
                  Terminada en {String(item.number_id).slice(-4)}
                </Description>
              </Left>
              <Right>
                <ButtonDelete onClick={() => mutation.mutate(item.id)}>
                  Eliminar
                </ButtonDelete>
              </Right>
            </Item>
          ))
        ) : (
          <p>No tienes tarjetas asociadas</p>
        )}
      </List>
    </Container>
  );
}
