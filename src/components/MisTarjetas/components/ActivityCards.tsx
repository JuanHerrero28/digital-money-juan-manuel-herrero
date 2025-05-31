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


const mockData = [
  { id: 1, desc: "Terminada en 0000"},
  { id: 2, desc: "Terminada en 0001"},
  { id: 3, desc: "Terminada en 0002"},
  { id: 4, desc: "Terminada en 0003"},
];

export default function ActivityCards() {
  return (
    <Container>
      <Header>Tus tarjetas</Header>
      <List>
        {mockData.map((item) => (
          <Item key={item.id}>
            <Left>
              <Circle />
              <Description>{item.desc}</Description>
            </Left>
            <Right>
            <ButtonDelete>Eliminar</ButtonDelete>
            </Right>
          </Item>
        ))}
      </List>
    </Container>
  );
}
