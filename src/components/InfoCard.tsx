import styled from 'styled-components';

const CardContainer = styled.div`
  width: 650px;
  max-width: 400px;
  background-color: white;
  border-radius: 25px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  h3 {
    font-size: 25px;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  hr {
    width: 100%;
    height: 2px;
    background-color: #C1FD35;
    border: none;
    margin-bottom: 1rem;
  }

  p {
    font-size: 16px;
    font-weight: 400;
    color: #201F22;
  }
`;

type InfoCardProps = {
  title: string;
  description: string;
};

export default function InfoCard({ title, description }: InfoCardProps) {
  return (
    <CardContainer>
      <h3>{title}</h3>
      <hr />
      <p>{description}</p>
    </CardContainer>
  );
}
