/**
 *
 * Carousel
 *
 */

import React from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
// import styled from 'styled-components';

function Carousel({ CardComponent, data }) {
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
    <Slider {...sliderSettings}>
      {data.map(item => (
        <CardComponent data={item} key={item.key} />
      ))}
    </Slider>
  );
}

Carousel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  CardComponent: PropTypes.elementType,
};

export default Carousel;
