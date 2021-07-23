/**
 *
 * UpcomingCarousel
 *
 */

import { useColorModeValue } from '@chakra-ui/react';
import Card from 'components/Card/Loadable';
import Carousel from 'components/Carousel';
import { makeSelectCourses } from 'containers/HomePage/selectors';
import PropTypes from 'prop-types';
import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect } from 'react-redux-firebase';
// import styled from 'styled-components';

const sliderSettings = {
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToScroll: 1,
  slidesToShow: 3,
  centerPadding: '100px',
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 2,
      },
    },

    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

function UpcomingCarousel({ courses }) {
  return (
    <Carousel
      CardComponent={Card}
      details={courses}
      sliderName="Upcoming Courses"
      sliderSettings={sliderSettings}
      bgColor={useColorModeValue('white.400', 'gray.800')}
    />
  );
}

UpcomingCarousel.propTypes = {
  courses: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  courses: makeSelectCourses(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  firebaseConnect(() => [{ path: 'courses' }]),
  withConnect,
)(UpcomingCarousel);
