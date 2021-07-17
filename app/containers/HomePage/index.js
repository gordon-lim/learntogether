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
import { useStore } from 'react-redux';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const details = [
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
  const store = useStore();
  return (
    <Box>
      <Hero />
      <div>{store.getState()}</div>
      {/* <UpcomingCarousel /> */}
      <Container maxW="7xl" py={12}>
        <Carousel CardComponent={CourseCard} details={details} />
      </Container>
    </Box>
  );
}
