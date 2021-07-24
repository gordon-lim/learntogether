import React from 'react';
import PropTypes from 'prop-types';
import { Box, Image, Badge } from '@chakra-ui/react';

function CourseCard({ data }) {
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="xl"
    >
      <Image src={data.value.imageUrl} alt={data.value.imageAlt} />

      <Box p="6">
        <Box d="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="green">
            Ongoing
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            {data.value.startDate} - {data.value.endDate}
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
        {data.value.duration}{' '}
        <Box
          as="span"
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
        >
          HOURS
        </Box>
      </Box>
    </Box>
  );
}

CourseCard.propTypes = {
  data: PropTypes.shape({
    value: PropTypes.shape({
      imageAlt: PropTypes.string,
      imageUrl: PropTypes.string,
      title: PropTypes.string,
      startDate: PropTypes.string,
      endDate: PropTypes.string,
    }),
  }),
};

export default CourseCard;
