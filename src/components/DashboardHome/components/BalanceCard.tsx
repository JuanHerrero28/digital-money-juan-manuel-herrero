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
    color:rgb(255, 255, 255);
    font-weight: bold;
    margin: 0.5rem 0 0 0;
    border: 2px solid #c1fd35;
    border-radius: 2rem;
    padding: 0.5rem 1rem;
  }
`;

interface BalanceCardProps {
  amount: string;
}

export default function BalanceCard({ amount }: BalanceCardProps) {
  return (
    <Card>
      <TopRightButtons>
        <Button>Ver tarjetas</Button>
        <Button>Ver CVU</Button>
      </TopRightButtons>
      <BottomLeft>
        <h4>Dinero disponible</h4>
        <p>$ {amount}</p>
      </BottomLeft>
    </Card>
  );
}
