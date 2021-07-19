/**
 *
 * PastCoursesCarousel
 *
 */

import React from 'react';
import Carousel from 'components/Carousel';
import CourseCard from 'components/Card/CourseCard';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
const details = [
  {
    imageUrl: 'https://bit.ly/3kognHo',
    imageAlt: 'Rear view of modern home with pool',
    title: 'Introduction to Psychology',
    startDate: '5 Nov 2021',
    endDate: '24 Dec 2021',
    timing: 'MonWedFri 9.00pm-10.00pm EST',
  },
  {
    imageUrl: 'https://bit.ly/3kognHo',
    imageAlt: 'Rear view of modern home with pool',
    title: 'Using Python to make your first Telegram bot',
    startDate: '5 Nov 2021',
    endDate: '24 Dec 2021',
    timing: 'WedFri 9.00pm-10.00pm EST',
  },
  {
    imageUrl: 'https://bit.ly/3kognHo',
    imageAlt: 'Rear view of modern home with pool',
    title: 'How to incorportae UI/UX concepts into your designs',
    startDate: '5 Nov 2021',
    endDate: '24 Dec 2021',
    timing: 'MonTue 9.00pm-10.00pm EST',
  },
  {
    imageUrl: 'https://bit.ly/3kognHo',
    imageAlt: 'Rear view of modern home with pool',
    title: 'Web development with React',
    startDate: '5 Nov 2021',
    endDate: '24 Dec 2021',
    timing: 'MonFri 9.00pm-10.00pm EST',
  },
];

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

function PastCoursesCarousel() {
  return (
    <Carousel
      CardComponent={CourseCard}
      details={details}
      sliderName="Past Courses"
      sliderSettings={sliderSettings}
    />
  );
}

PastCoursesCarousel.propTypes = {};

export default PastCoursesCarousel;
