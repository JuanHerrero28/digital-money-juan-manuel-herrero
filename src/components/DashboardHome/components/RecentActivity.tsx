import styled from "styled-components";
import { FiArrowRight } from "react-icons/fi"; // Ícono de flecha

const Container = styled.div`
  background-color: white;
  min-height: 350px;
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

const Amount = styled.div`
  font-weight: bold;
  color: #201f22;
`;

const Date = styled.div`
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

const mockData = [
  { id: 1, desc: "Transferiste a Rodrigo", amount: "-$1265,57", date: "sábado" },
  { id: 2, desc: "Transferiste a Consorcio", amount: "-$1265,57", date: "sábado" },
  { id: 3, desc: "Ingresaste dinero", amount: "+$1265,57", date: "sábado" },
  { id: 4, desc: "Te transfirieron dinero", amount: "+$1265,57", date: "sábado" },
];

export default function RecentActivity() {
  return (
    <Container>
      <Header>Tu actividad</Header>
      <List>
        {mockData.map((item) => (
          <Item key={item.id}>
            <Left>
              <Circle />
              <Description>{item.desc}</Description>
            </Left>
            <Right>
              <Amount>{item.amount}</Amount>
              <Date>{item.date}</Date>
            </Right>
          </Item>
        ))}
      </List>
      <FooterButton onClick={() => alert("Ver toda tu actividad")}>
        Ver toda tu actividad <FiArrowRight />
      </FooterButton>
    </Container>
  );
}
