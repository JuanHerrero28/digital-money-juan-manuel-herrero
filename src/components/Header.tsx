import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 100%;
  height: 64px;
  background-color: #201F22;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 0 1rem;
  }
`;

const Logo = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  color: #C1FD35;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button<{ variant?: 'outline' | 'solid' }>`
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  background-color: ${({ variant }) => (variant === 'solid' ? '#C1FD35' : 'transparent')};
  color: ${({ variant }) => (variant === 'solid' ? '#201F22' : '#C1FD35')};
  border: 1px solid #C1FD35;
  transition: 0.2s ease-in-out;

  &:hover {
    opacity: 0.85;
  }
`;

export default function Header() {
  return (
    <HeaderContainer>
      <Logo>DMH</Logo>
      <NavButtons>
        <Button variant="outline">Ingresar</Button>
        <Button variant="solid">Crear cuenta</Button>
      </NavButtons>
    </HeaderContainer>
  );
}
