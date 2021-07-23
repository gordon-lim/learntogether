/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import { Box } from '@chakra-ui/react';
import UpcomingCarousel from 'components/Carousel/UpcomingCarousel';
import Hero from 'components/Hero';
import React, { memo } from 'react';
import { compose } from 'redux';

function HomePage() {
  return (
    <Box>
      <Hero />
      <UpcomingCarousel />
    </Box>
  );
}

// HomePage.propTypes = {};

export default compose(memo)(HomePage);
