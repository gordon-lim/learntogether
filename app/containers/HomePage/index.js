/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import { Box, Container } from '@chakra-ui/react';
import CourseCard from 'components/Card/CourseCard';
import Carousel from 'components/Carousel';
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
      {/* <UpcomingCarousel /> */}
      <Container maxW="7xl" py={12}>
        <Carousel CardComponent={CourseCard} details={details} />
      </Container>
    </Box>
  );
}
