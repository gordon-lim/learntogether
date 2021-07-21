/**
 *
 * UpcomingCarousel
 *
 */

import React from 'react';
import Carousel from 'components/Carousel';
import Card from 'components/Card';
import { useColorModeValue } from '@chakra-ui/react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
const details = [
  {
    imageUrl: 'https://bit.ly/3kognHo',
    imageAlt: 'Rear view of modern home with pool',
    videos: 24,
    id: '1',
    quizzes: 5,
    title: 'Introduction to Psychology',
    formattedPrice: '$1,900.00',
    reviewCount: 34,
    rating: 4,
  },
  {
    imageUrl: 'https://bit.ly/3kognHo',
    imageAlt: 'Rear view of modern home with pool',
    videos: 12,
    quizzes: 3,
    title: 'Using Python to make your first Telegram bot',
    formattedPrice: '$2,100.00',
    reviewCount: 43,
    rating: 4,
  },
  {
    imageUrl: 'https://bit.ly/3kognHo',
    imageAlt: 'Rear view of modern home with pool',
    videos: 10,
    quizzes: 2,
    title: 'How to incorportae UI/UX concepts into your designs',
    formattedPrice: '$1,500.00',
    reviewCount: 24,
    rating: 4,
  },
  {
    imageUrl: 'https://bit.ly/3kognHo',
    imageAlt: 'Rear view of modern home with pool',
    videos: 20,
    quizzes: 10,
    title: 'Web development with React',
    formattedPrice: '$3,500.00',
    reviewCount: 56,
    rating: 5,
  },
];

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

function UpcomingCarousel() {
  return (
    <Carousel
      CardComponent={Card}
      details={details}
      sliderName="Upcoming Courses"
      sliderSettings={sliderSettings}
      bgColor={useColorModeValue('white.400', 'gray.800')}
    />
  );
}

UpcomingCarousel.propTypes = {};

export default UpcomingCarousel;
