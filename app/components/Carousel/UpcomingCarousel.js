/**
 *
 * UpcomingCarousel
 *
 */

import React from 'react';
import Carousel from 'components/Carousel';
import Card from 'components/Card';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

function UpcomingCarousel() {
  const data = [{ foo: 'bar', key: '0' }, { foo: 'gar', key: '1' }];
  return <Carousel CardComponent={Card} details={data} />;
}

UpcomingCarousel.propTypes = {};

export default UpcomingCarousel;
