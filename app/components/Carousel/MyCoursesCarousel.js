/**
 *
 * MyCoursesCarousel
 *
 */

import CourseCard from 'components/Card/CourseCard';
import Carousel from 'components/Carousel';
import { makeSelectCoursesJoined } from 'containers/TimetablePage/selectors';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
// import styled from 'styled-components';

const sliderSettings = {
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToScroll: 1,
  slidesToShow: 2,
  centerPadding: '100px',
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

function MyCoursesCarousel({ courses }) {
  // console.log(details);
  return (
    <Carousel
      CardComponent={CourseCard}
      details={courses}
      sliderName="My Courses"
      sliderSettings={sliderSettings}
    />
  );
}

MyCoursesCarousel.propTypes = {
  courses: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  courses: makeSelectCoursesJoined(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  firebaseConnect(() => [
    {
      path: 'coursesJoined',
    },
  ]),
  withConnect,
)(MyCoursesCarousel);
