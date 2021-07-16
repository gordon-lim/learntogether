/**
 *
 * Carousel
 *
 */

import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Carousel({ cardComponent, data }) {
  console.log('base carousel loaded');
  const sliderSettings = {
    arrows: false,
    slidesToShow: 3,
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

  return (
    <Slider {...sliderSettings}>{data.map(item => cardComponent(item))}</Slider>
  );
}

Carousel.propTypes = {
  data: PropTypes.string,
  cardComponent: PropTypes.func,
};

export default Carousel;
