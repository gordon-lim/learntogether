import { Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { LogoIcon } from './LogoIcon';

const Logo = () => (
  <>
    <LogoIcon
      width="50px"
      height="50px"
      color={useColorModeValue('red.600', 'red.500')}
    />
    <Text
      color={useColorModeValue('gray.800', 'gray.200')}
      className="logoText"
    >
      LearnTogether
    </Text>
  </>
);

export default Logo;
