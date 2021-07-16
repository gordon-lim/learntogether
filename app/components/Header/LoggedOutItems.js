import { Button, Stack } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const LoggedOutItems = () => (
  <Stack
    flex={{ base: 1, md: 0 }}
    justify="flex-end"
    direction="row"
    spacing={6}
  >
    <Button as={RouterLink} fontSize="sm" fontWeight={400} to="/auth/signin">
      Sign In
    </Button>
    <Button
      as={RouterLink}
      display={{ base: 'none', md: 'inline-flex' }}
      fontSize="sm"
      fontWeight={600}
      color="white"
      bg="pink.400"
      to="/auth/signup"
      _hover={{
        bg: 'pink.300',
      }}
    >
      Sign Up
    </Button>
  </Stack>
);
