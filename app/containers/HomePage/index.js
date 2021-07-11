/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import { Box } from '@chakra-ui/react';
import React from 'react';
import Hero from '../../components/Hero';

export default function HomePage() {
  return (
    <Box>
      <Hero />
    </Box>
  );
}
