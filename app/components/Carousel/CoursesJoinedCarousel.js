/**
 *
 * MyCoursesCarousel
 *
 */

import CourseCard from 'components/Card/CourseCard';
import Carousel from 'components/Carousel';
import { makeSelectFirebaseAuth } from 'containers/App/selectors';
import { makeSelectCourses } from 'containers/HomePage/selectors';
import { makeSelectCoursesJoined } from 'containers/TimetablePage/selectors';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { mergeCourseArrays } from './CoursesCompletedCarousel';
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

function CoursesJoinedCarousel({ auth, coursesJoined, courses }) {
  const newCourses = mergeCourseArrays(courses, coursesJoined, auth.uid);
  return (
    <Carousel
      CardComponent={CourseCard}
      details={newCourses}
      sliderName="My Courses"
      sliderSettings={sliderSettings}
    />
  );
}

CoursesJoinedCarousel.propTypes = {
  auth: PropTypes.object,
  coursesJoined: PropTypes.array,
  courses: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  coursesJoined: makeSelectCoursesJoined(),
  auth: makeSelectFirebaseAuth(),
  courses: makeSelectCourses(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  firebaseConnect(() => [
    {
      path: 'coursesJoined',
    },
  ]),
  withConnect,
)(CoursesJoinedCarousel);
