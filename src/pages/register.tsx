import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import RegisterForm from '@/components/auth/RegisterForm';
import Footer from '@/components/common/Footer';

const PageWrapper = styled.div`
  background-color: #201f22;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const TopBar = styled.div`
  height: 64px;
  background-color: #c1fd35;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.desktop}) {
    padding: 0 1rem;
  }
`;

const LoginButton = styled(Link)`
  background-color: #201f22;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    opacity: 0.85;
  }
`;

export default function RegisterPage() {
  return (
    <>
      <Head>
        <title>Crear cuenta | DMH</title>
      </Head>
      <PageWrapper>
        <TopBar>
          <LoginButton href="/login">Iniciar sesión</LoginButton>
        </TopBar>
        <RegisterForm />
        <Footer/>
      </PageWrapper>
    </>
  );
}
