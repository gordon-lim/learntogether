/**
 *
 * WeekGridItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Box } from '@chakra-ui/react';

export default function WeekGridItem({ numSlots }) {
  if (numSlots === 0) {
    return (
      <Box
        as="button"
        width="100%"
        height={10}
        justifyContent="flex-end"
        _hover={{
          bg: 'gray.100',
        }}
      >
        - Vote -
      </Box>
    );
  }

  return (
    <Box
      as="button"
      width="100%"
      height={10}
      justifyContent="flex-end"
      bg="green.100"
      _hover={{
        bg: 'green.200',
      }}
    >
      - {numSlots} slots -
    </Box>
  );
}

WeekGridItem.propTypes = {
  numSlots: PropTypes.number,
};
