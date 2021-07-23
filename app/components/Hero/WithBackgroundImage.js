/**
 *
 * Hero
 *
 */

import {
  Button,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
// import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

export default function WithBackgroundImage(props) {
  // const bgUrl = '';
  const {
    title,
    leftButtonText,
    leftButtonLink,
    rightButtonText,
    rightButtonLink,
  } = props;

  return (
    <Flex
      w="full"
      h="70vh"
      backgroundImage="url(https://images.unsplash.com/photo-1600267175161-cfaa711b4a81?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)"
      backgroundSize="cover"
      backgroundPosition="center center"
    >
      <VStack
        w="full"
        justify="center"
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient="linear(to-r, blackAlpha.600, transparent)"
      >
        <Stack maxW="2xl" align="center" spacing={6}>
          <Text
            color="white"
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}
            textAlign="center"
          >
            {title}
          </Text>
          <Stack direction="row">
            <Button
              as={RouterLink}
              to={leftButtonLink}
              rounded="md"
              colorScheme="red"
              color="white"
              bg={useColorModeValue('red.300', 'red.400')}
            >
              {leftButtonText}
            </Button>
            <Button
              as={RouterLink}
              to={rightButtonLink}
              bg="whiteAlpha.300"
              rounded="md"
              color="white"
              _hover={{ bg: 'whiteAlpha.500' }}
            >
              {rightButtonText}
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}

WithBackgroundImage.propTypes = {
  title: PropTypes.string,
  leftButtonText: PropTypes.string,
  leftButtonLink: PropTypes.string,
  rightButtonText: PropTypes.string,
  rightButtonLink: PropTypes.string,
};
