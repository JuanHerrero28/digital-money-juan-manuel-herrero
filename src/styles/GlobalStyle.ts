import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overflow-x: hidden;
  }

  html {
    font-family: 'Open Sans', sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  body {
    font-size: 16px;
  }

  h1 {
    font-size: 35pt;
    font-weight: 400;
  }

  h2 {
    font-size: 20pt;
    font-weight: 700;
  }

  h3 {
    font-size: 16pt;
    font-weight: 700;
  }

  h4 {
    font-size: 14pt;
    font-weight: 700;
  }

  .button-1 {
    font-size: 14pt;
    font-weight: 700;
  }

  .button-2 {
    font-size: 16pt;
    font-weight: 700;
  }

  .button-3 {
    font-size: 16pt;
    font-weight: 600;
    text-decoration: underline;
  }

  .text-1 {
    font-size: 14pt;
    font-weight: 500;
  }

  .text-2 {
    font-size: 12pt;
    font-weight: 500;
  }

  .text-error {
    font-size: 15pt;
    font-style: italic;
  }
`;



