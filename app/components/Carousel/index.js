/**
 *
 * Carousel
 *
 */

import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
// import styled from 'styled-components';

const sliderSettings = {
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToScroll: 3,
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
function Carousel({ CardComponent, details }) {
  return (
    <Slider {...sliderSettings}>
      {details.map(item => (
        <CardComponent data={item} key={v4()} />
      ))}
    </Slider>
  );
}

Carousel.propTypes = {
  details: PropTypes.arrayOf(PropTypes.object),
  CardComponent: PropTypes.elementType,
};

export default Carousel;
