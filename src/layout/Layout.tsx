import { ReactNode } from 'react';
import styled from 'styled-components';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  
  display: flex;
  flex-direction: column;

  background-image: url("/assets/img-fond.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;

  min-height: 100vh;
  overflow-x: hidden;
`;

type Props = {
  children: ReactNode;
  simpleHeader?: boolean;
};

export default function Layout({ children, simpleHeader = false }: Props) {
  return (
    <Wrapper>
      <Header onlyLogo={simpleHeader} />
      {children}
      <Footer />
    </Wrapper>
  );
}
