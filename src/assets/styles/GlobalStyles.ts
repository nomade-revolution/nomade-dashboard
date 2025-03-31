import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
*, ::after, ::before {
  box-sizing: border-box;
}

body {
  font-family: "Roboto";
  padding: 0;
  margin: 0;
  background: ${(props) => props.theme.colors.backgroundPages};
  

}

h1,h2{
  padding: 0;
  margin: 0;
}

ol, ul, li {
  list-style: none;
  margin: 0;
  padding: 0;
  text-decoration: none;
}

button{
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-family: inherit;
}

.list-mobile {
  display: flex;

  @media (min-width: 768px) {
    display: none;
  }
}

a, :visited {
text-decoration: none;
color: inherit;
}

&::-webkit-scrollbar {
      width: 8px; /* Width of the entire scrollbar */
    }

    &::-webkit-scrollbar-track {
      background: ${(props) =>
        props.theme.colors
          .backgroundPages}; /* Background of the scrollbar track */
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${(props) =>
        props.theme.colors.mainColor}; /* Color of the scrollbar thumb */
      border-radius: 10px; /* Roundness of the scrollbar thumb */
      border: 3px solid ${(props) =>
        props.theme.colors.backgroundPages}; /* Space around thumb */
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: ${(props) =>
        props.theme.colors
          .mainColorDark}; /* Color of the scrollbar thumb on hover */
    }
  
  .disabled-day {
    background-color: #CECECE;
    opacity: 0.6;
    pointer-events: none;
    cursor: not-allowed;
  }
`;

export default GlobalStyles;
