import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  #app {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    line-height: 1.5em;
  }

  .logoText {
    font-family: "Ubuntu";
    font-size: 16px;
    font-weight: 600;
  }

  .chakra-ui-dark .rbc-row-bg .rbc-off-range-bg,
  .chakra-ui-dark .rbc-calendar .rbc-today {
    background: var(--chakra-colors-gray-700);
  }
  .chakra-ui-dark .rbc-row-bg .rbc-today {
    background: var(--chakra-colors-green-700);
  }

  .rbc-calendar .rbc-toolbar button {
    transition-property: var(--chakra-transition-property-common);  
    transition-duration: var(--chakra-transition-duration-normal);  
  }

  .chakra-ui-dark .rbc-calendar .rbc-toolbar button {
    color: white;
  }

  .chakra-ui-dark .rbc-calendar .rbc-toolbar button.rbc-active{
    background-color: var(--chakra-colors-gray-600);
  }

  .chakra-ui-dark .rbc-calendar .rbc-toolbar button.rbc-active:hover, 
  .chakra-ui-dark .rbc-calendar .rbc-toolbar button.rbc-active:focus {
    background-color: var(--chakra-colors-gray-300);
  }

  .chakra-ui-dark .rbc-calendar .rbc-month-row + .rbc-month-row,
  .chakra-ui-dark .rbc-calendar .rbc-day-bg + .rbc-day-bg,
  .chakra-ui-dark .rbc-calendar .rbc-time-content > * + * > *,
  .chakra-ui-dark .rbc-calendar .rbc-day-slot .rbc-time-slot,
  .chakra-ui-dark .rbc-calendar .rbc-timeslot-group,
  .chakra-ui-dark .rbc-calendar .rbc-time-header-content,
  .chakra-ui-dark .rbc-calendar .rbc-time-content {
    border-color: var(--chakra-colors-gray-600);
  }
`;

export default GlobalStyle;
