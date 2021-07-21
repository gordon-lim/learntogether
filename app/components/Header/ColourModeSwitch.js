import { Box, Switch, Tooltip, useColorMode } from '@chakra-ui/react';
import React from 'react';

const ColourModeSwitch = props => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip label="Colour Mode" aria-label="Colour Mode">
      <Box>
        <Switch
          {...props}
          onChange={toggleColorMode}
          alignSelf="center"
          isChecked={colorMode !== 'light'}
        />
      </Box>
    </Tooltip>
  );
};

export default ColourModeSwitch;
