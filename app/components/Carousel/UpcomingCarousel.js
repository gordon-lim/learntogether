/**
 *
 * UpcomingCarousel
 *
 */

import React from 'react';
import Carousel from 'components/Carousel';
import CourseJoinCard from 'components/CourseJoinCard';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function UpcomingCarousel() {
  const data = { foo: 'bar' };
  console.log('upcoming carousel loaded');
  return <Carousel cardComponent={CourseJoinCard} data={data} />;
}

UpcomingCarousel.propTypes = {};

export default UpcomingCarousel;
