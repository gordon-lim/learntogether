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
      <Image src={data.imageUrl} alt={data.imageAlt} />

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
            {data.startDate} - {data.endDate}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {data.title}
        </Box>
        <Box
          color="gray.500"
          fontWeight="semibold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
        >
          {data.timing}
        </Box>
      </Box>
    </Box>
  );
}

CourseCard.propTypes = {
  data: PropTypes.object,
};

export default CourseCard;
