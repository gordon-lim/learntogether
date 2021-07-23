/**
 *
 * PastCoursesCarousel
 *
 */

import CourseCard from 'components/Card/CourseCard';
import Carousel from 'components/Carousel';
import { makeSelectFirebaseAuth } from 'containers/App/selectors';
import { makeSelectCourses } from 'containers/HomePage/selectors';
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

export const mergeCourseArrays = (courses, coursesCompleted, userId) => {
  let newArray = [];
  if (courses && coursesCompleted && userId) {
    newArray = coursesCompleted.map(pastCourse => {
      const courseToAdd = courses.filter(
        course =>
          course.key === pastCourse.value.courseId &&
          userId === pastCourse.value.userId,
      );
      if (courseToAdd.length === 0) return null;

      return {
        key: pastCourse.key,
        value: {
          ...pastCourse.value,
          imageUrl: courseToAdd[0].value.imageUrl,
          imageAlt: courseToAdd[0].value.imageAlt,
          title: courseToAdd[0].value.title,
          duration: courseToAdd[0].value.duration,
        },
      };
    });
  }
  return newArray.filter(Boolean);
};

function CoursesCompletedCarousel({ coursesCompleted, courses, auth }) {
  const newCourses = mergeCourseArrays(courses, coursesCompleted, auth.uid);
  return (
    <Carousel
      CardComponent={CourseCard}
      details={newCourses}
      sliderName="Past Courses"
      sliderSettings={sliderSettings}
    />
  );
}

CoursesCompletedCarousel.propTypes = {
  auth: PropTypes.object,
  coursesCompleted: PropTypes.array,
  courses: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  auth: makeSelectFirebaseAuth(),
  coursesCompleted: makeSelectCoursesCompleted(),
  courses: makeSelectCourses(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  firebaseConnect(() => [
    {
      path: 'coursesCompleted',
    },
    {
      path: 'courses',
    },
  ]),
  withConnect,
)(CoursesCompletedCarousel);
