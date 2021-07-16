/**
 *
 * Carousel
 *
 */

import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Carousel({ CardComponent, details }) {
  const sliderSettings = {
    arrows: false,
    slidesToShow: 1,
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
    <Slider {...sliderSettings}>
      {details.map(item => (
        <CardComponent key={item.key} data={item} />
      ))}
    </Slider>
  );
}

Carousel.propTypes = {
  details: PropTypes.arrayOf(PropTypes.object),
  CardComponent: PropTypes.elementType,
};

export default Carousel;
