/**
 *
 * CourseJoinCard
 *
 */

import { StarIcon } from '@chakra-ui/icons';
import { Badge, Box, Button, Image, useColorModeValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { v4 } from 'uuid';
// import styled from 'styled-components';

function Card({ data }) {
  // console.log(data);
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="xl"
      bg={useColorModeValue('white', 'gray.900')}
    >
      <Image src={data.value.imageUrl} alt={data.value.imageAlt} />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="red">
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
            {data.value.videos} videos &bull; {data.value.quizzes} quizzes
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {data.value.title}
        </Box>

        <Box>
          {data.value.duration}{' '}
          <Box as="span" color="gray.500" fontSize="md">
            hours
          </Box>
        </Box>

        <Box d="flex" mt="2" alignItems="center">
          {Array(5)
            .fill('')
            .map((_, i) => (
              <StarIcon
                key={v4()}
                color={i < data.value.rating ? 'red.500' : 'gray.300'}
              />
            ))}
          <Box as="span" ml="2" color="gray.500" fontSize="sm">
            {data.value.reviewCount} reviews
          </Box>
        </Box>
      </Box>
      <Button
        as={RouterLink}
        to={`/courses/${data.key}`}
        borderTopRightRadius="0px"
        borderTopLeftRadius="0px"
        colorScheme="red"
        color="white"
        bg={useColorModeValue('red.400', 'red.500')}
        isFullWidth="true"
      >
        Learn now
      </Button>
    </Box>
  );
}

Card.propTypes = {
  data: PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.shape({
      courseUrl: PropTypes.string.isRequired,
      imageAlt: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      quizzes: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      reviewCount: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      videos: PropTypes.number.isRequired,
      duration: PropTypes.number.isRequired,
    }),
  }),
};

export default Card;
