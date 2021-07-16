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

function Carousel({ CardComponent, data }) {
  const sliderSettings = {
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  return (
    <Slider {...sliderSettings}>
      {data.map(item => (
        <CardComponent data={item} key={v4()} />
      ))}
    </Slider>
  );
}

Carousel.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  CardComponent: PropTypes.elementType,
};

export default Carousel;
