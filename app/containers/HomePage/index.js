/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import { Box } from '@chakra-ui/react';
import UpcomingCarousel from 'components/Carousel/UpcomingCarousel';
import Hero from 'components/Hero';
import React from 'react';

export const details = [
  {
    category: 'Web Development',
    title: 'React Course',
    duration: '100 Hours',
  },
  {
    category: 'Web Development',
    title: 'Node Course',
    duration: '100 Hours',
  },
  {
    category: 'Web Development',
    title: 'Django Course',
    duration: '100 Hours',
  },
];

export default function HomePage() {
  return (
    <Box>
      <Hero />
      <UpcomingCarousel />
    </Box>
  );
}
