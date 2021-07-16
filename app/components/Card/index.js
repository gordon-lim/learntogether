/**
 *
 * CourseJoinCard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image, Badge, Flex, Heading, IconButton } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
// import styled from 'styled-components';

function Card({ data }) {
  const property = {
    imageUrl: 'https://bit.ly/3kognHo',
    imageAlt: 'Rear view of modern home with pool',
    beds: 3,
    baths: 2,
    title: data.foo,
    formattedPrice: '$1,900.00',
    reviewCount: 34,
    rating: 4,
  };

  return (
    <Box maxW="32rem" margin="auto" py="5rem">
      <Flex direction="column" align="center" justify="content">
        <Heading
          fontSize="4xl"
          color="black"
          letterSpacing="0.025em"
          align="center"
        >
          Upcoming Courses
        </Heading>

        <Flex align="center">
          <IconButton isRound="true" icon={<ArrowBackIcon />} />

          <IconButton isRound="true" icon={<ArrowForwardIcon />} />
        </Flex>
      </Flex>

      <Image src={property.imageUrl} alt={property.imageAlt} />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {property.beds} beds &bull; {property.baths} baths
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {property.title}
        </Box>

        <Box>
          {property.formattedPrice}
          <Box as="span" color="gray.600" fontSize="sm">
            / wk
          </Box>
        </Box>

        <Box d="flex" mt="2" alignItems="center">
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {property.reviewCount} reviews
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

Card.propTypes = {
  data: PropTypes.object,
};

export default Card;
