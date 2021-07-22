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

  .rbc-row-bg .rbc-off-range-bg,
  .rbc-calendar .rbc-today {
    background: var(--chakra-colors-gray-700);
  }
  .rbc-row-bg .rbc-today {
    background: var(--chakra-colors-green-700);
  }

  .rbc-calendar .rbc-toolbar button {
    color: white;
    transition-property: var(--chakra-transition-property-common);  
    transition-duration: var(--chakra-transition-duration-normal);  
  }

  .rbc-calendar .rbc-toolbar button.rbc-active{
    background-color: var(--chakra-colors-gray-600);
  }

  .rbc-calendar .rbc-toolbar button.rbc-active:hover, 
  .rbc-calendar .rbc-toolbar button.rbc-active:focus {
    background-color: var(--chakra-colors-gray-300);
  }

  .rbc-calendar .rbc-month-row + .rbc-month-row,
  .rbc-calendar .rbc-day-bg + .rbc-day-bg,
  .rbc-calendar .rbc-time-content > * + * > *,
  .rbc-calendar .rbc-day-slot .rbc-time-slot,
  .rbc-calendar .rbc-timeslot-group,
  .rbc-calendar .rbc-time-header-content,
  .rbc-calendar .rbc-time-content {
    border-color: var(--chakra-colors-gray-600);
  }
`;

export default GlobalStyle;
