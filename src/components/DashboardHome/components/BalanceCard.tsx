import { useEffect, useState } from "react";
import { useAccount } from "@/hooks/useAccount";
import styled from "styled-components";

const Card = styled.div`
  background-color: #201f22;
  color: white;
  border-radius: 8px;
  padding: 1.5rem;
  width: 100%;
  min-height: 200px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TopRightButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 0.875rem;
  text-decoration: underline;

  &:hover {
    color: #c1fd35;
  }
`;

const BottomLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h4 {
    font-size: 0.8rem;
    margin: 0;
  }

  p {
    font-size: 1.5rem;
    color: white;
    font-weight: bold;
    margin: 0.5rem 0 0 0;
    border: 2px solid #c1fd35;
    border-radius: 2rem;
    padding: 0.5rem 1rem;
  }
`;

const Skeleton = styled.div`
  width: 120px;
  height: 32px;
  border-radius: 2rem;
  background: linear-gradient(90deg, #333 25%, #444 50%, #333 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  margin-top: 0.5rem;

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

interface BalanceCardProps {
  setActiveSection: (section: string) => void;
}

export default function BalanceCard({ setActiveSection }: BalanceCardProps) {
  const [isClient, setIsClient] = useState(false);
  const { data, isLoading, error } = useAccount();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formattedAmount = isClient && data?.available_amount?.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  if (!isClient) return null;

  return (
    <Card>
      <TopRightButtons>
        <Button onClick={() => setActiveSection("tarjetas")}>Ver tarjetas</Button>
        <Button onClick={() => setActiveSection("perfil")}>Ver CVU</Button>
      </TopRightButtons>
      <BottomLeft>
        <h4>Dinero disponible</h4>
        {isLoading ? (
          <Skeleton />
        ) : error || !data ? (
          <p>Error</p>
        ) : (
          <p>{formattedAmount}</p>
        )}
      </BottomLeft>
    </Card>
  );
}
