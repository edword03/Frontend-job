import {createGlobalStyle, DefaultTheme} from "styled-components";

declare module 'styled-component' {
  export interface DefaultTheme {
    defaultFontSize: string,
    color: {
      primary: string
      secondary: string
      defaultColor: string
      white: string
      hoverBlue: string
      bold: number
      black: string
      overBold: number
      shadow: string
    }
  }
}

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  *, *::before, *:after, *:active, *:focus, *:hover {
    outline: none;
    outline-offset: 0;
  }

  html {
    font-size: 14px;
  }

  body {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    font-size: ${prop => prop.theme.defaultFontSize};
    background-color: #FAFAFA;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    cursor: pointer;
  }

  button {
    cursor: pointer;
    border: none;
    background-color: inherit;
  }
  
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  figure {
    margin: 0;
    padding: 0;
  }
`

export const Theme: DefaultTheme = {
  primary: '#000',
  defaultFontSize: '14px',
  white: '#fff',
  secondary: '#0070FB',
  defaultColor: '#6B8397',
  hoverBlue: '#0070FB',
  bold: 700,
  black: '#000',
  overBold: 900,
  shadow: '0px 3px 15px rgba(0, 0, 0, 0.03)'
}