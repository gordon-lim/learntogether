/**
 *
 * Carousel
 *
 */

import React, { useState } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { v4 } from 'uuid';
import { Box, Flex, Heading, IconButton } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import styled from 'styled-components';

const sliderSettings = {
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToScroll: 3,
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

const CardSlider = styled(Slider)`
  margin-top: 4rem;
  .slick-slide {
    height: auto;
    justify-content: center;
    margin-bottom: 0.25rem;
    display: flex !important;
  }
`;

function Carousel({ CardComponent, details, sliderName }) {
  const [sliderRef, setSliderRef] = useState(null);

  return (
    <Box position="relative">
      <Box maxW="1280px" margin="auto" py="5rem">
        <Flex direction="row" align="stretch" justify="space-between">
          <Heading
            fontSize="4xl"
            color="black"
            letterSpacing="0.025em"
            align="center"
          >
            {sliderName}
          </Heading>

          <Flex align="center">
            <IconButton
              onClick={sliderRef ? sliderRef.slickPrev : () => undefined}
              padding="0.5rem"
              mt="0px"
              ml="1.5rem"
              isRound="true"
              icon={<ArrowBackIcon />}
              colorScheme="red"
            />

            <IconButton
              onClick={sliderRef ? sliderRef.slickNext : () => undefined}
              padding="0.5rem"
              mt="0px"
              ml="1.5rem"
              isRound="true"
              icon={<ArrowForwardIcon />}
              colorScheme="red"
            />
          </Flex>
        </Flex>
        <CardSlider ref={setSliderRef} {...sliderSettings}>
          {details.map(item => (
            <CardComponent data={item} key={v4()} />
          ))}
        </CardSlider>
      </Box>
    </Box>
  );
}

Carousel.propTypes = {
  details: PropTypes.arrayOf(PropTypes.object),
  sliderName: PropTypes.string,
  CardComponent: PropTypes.elementType,
};

export default Carousel;
