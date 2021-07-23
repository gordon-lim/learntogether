/**
 *
 * PastCoursesCarousel
 *
 */

import CourseCard from 'components/Card/CourseCard';
import Carousel from 'components/Carousel';
import { makeSelectCoursesCompleted } from 'containers/ProfilePage/selectors';
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

function PastCoursesCarousel({ pastCourses }) {
  return (
    <Carousel
      CardComponent={CourseCard}
      details={pastCourses}
      sliderName="Past Courses"
      sliderSettings={sliderSettings}
    />
  );
}

PastCoursesCarousel.propTypes = {
  pastCourses: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  pastCourses: makeSelectCoursesCompleted(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  firebaseConnect(() => [
    {
      path: 'coursesCompleted',
    },
  ]),
  withConnect,
)(PastCoursesCarousel);
