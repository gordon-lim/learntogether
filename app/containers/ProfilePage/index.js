/**
 *
 * ProfilePage
 *
 */

import { Box, Grid, Stack, useColorModeValue } from '@chakra-ui/react';
import CoursesJoinedCarousel from 'components/Carousel/CoursesJoinedCarousel';
import CoursesCompletedCarousel from 'components/Carousel/CoursesCompletedCarousel';
// import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

import SocialProfile from 'components/SocialProfile';

export default function ProfilePage() {
  return (
    <Box bgColor={useColorModeValue('white.400', 'gray.800')} pt="4em">
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="Description of Profile Page" />
      </Helmet>
      <Grid
        templateColumns="1fr minmax(300px, 3fr)"
        maxW="8xl"
        m="0 auto"
        gap={5}
      >
        <SocialProfile />
        <Stack spacing={10}>
          <CoursesJoinedCarousel />
          <CoursesCompletedCarousel />
        </Stack>
      </Grid>
    </Box>
  );
}
