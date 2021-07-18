import { Switch, useColorMode } from '@chakra-ui/react';
import React from 'react';

const ColourModeSwitch = props => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Switch
      {...props}
      onChange={toggleColorMode}
      alignSelf="center"
      isChecked={colorMode !== 'light'}
    />
  );
};

export default ColourModeSwitch;
