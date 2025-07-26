import styled from "styled-components";
import { FiArrowRight } from "react-icons/fi";
import { useActividad } from "@/hooks/useActividad";
import { useEffect, useState } from "react";

const Container = styled.div`
  background-color: white;
  min-height: 350px;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
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
  cursor: pointer;
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

const Amount = styled.div<{ tipo: string }>`
  font-weight: bold;
  color: ${({ tipo }) => (tipo === "ingreso" ? "green" : "red")};
`;

const DateText = styled.div`
  font-size: 0.75rem;
  color: #7a7a7a;
`;

const FooterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  color: #201f22;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const SkeletonLine = styled.div`
  height: 20px;
  background: linear-gradient(90deg, #eee 25%, #f2f2f2 50%, #eee 75%);
  background-size: 200% 100%;
  animation: shimmer 1.2s infinite;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  width: 100%;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

interface RecentActivityProps {
  setActiveSection: (section: string) => void;
  searchTerm: string;
}

export default function RecentActivity({ setActiveSection, searchTerm }: RecentActivityProps) {
  const [isClient, setIsClient] = useState(false);
  const { actividades, isLoading, error } = useActividad();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const actividadesFiltradas = actividades.filter((item) =>
    item.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Header>Tu actividad</Header>

      <List>
        {isLoading && (
          <>
            <SkeletonLine />
            <SkeletonLine />
            <SkeletonLine />
          </>
        )}

        {!isLoading && error && <p>Error al obtener tus transferencias</p>}

        {!isLoading && !error && actividadesFiltradas.length === 0 && (
          <p>No hay resultados para tu búsqueda.</p>
        )}

        {!isLoading &&
          !error &&
          actividadesFiltradas.slice(0, 10).map((item) => (
            <Item key={item.id} onClick={() => console.log(item)}>
              <Left>
                <Circle />
                <Description>{item.descripcion}</Description>
              </Left>
              <Right>
                <Amount tipo={item.tipo}>
                  {item.amount.toLocaleString("es-AR", {
                    style: "currency",
                    currency: "ARS",
                  })}
                </Amount>
                <DateText>
                  {new Date(item.dated).toLocaleDateString("es-AR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </DateText>
              </Right>
            </Item>
          ))}
      </List>

      <FooterButton onClick={() => setActiveSection("actividad")}>
        Ver toda la actividad <FiArrowRight />
      </FooterButton>
    </Container>
  );
}
