import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  height: 64px;
  background-color: #3A393E;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-left: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding-left: 1rem;
  }
`;

const FooterText = styled.p`
  color: #C1FD35;
  font-size: 11pt;
  font-weight: 400;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <FooterText>© 2022 Digital Money House</FooterText>
    </FooterContainer>
  );
}

