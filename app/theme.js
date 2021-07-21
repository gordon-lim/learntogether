import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  initialColorMode: 'dark',
  useSystemColorMode: false,
  fonts: {
    heading: 'Work Sans,system-ui,sans-serif',
  },
});

export default theme;
