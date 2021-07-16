/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import { Box, Container } from '@chakra-ui/react';
import React from 'react';
import Carousel from 'components/Carousel';
import Hero from 'components/Hero';
import CourseCard from 'components/Card/CourseCard';

export default function HomePage() {
  const data = [
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

  return (
    <Box>
      <Hero />
      {/* <UpcomingCarousel /> */}
      <Container maxW="7xl" py={12}>
        <Carousel CardComponent={CourseCard} data={data} />
      </Container>
    </Box>
  );
}
