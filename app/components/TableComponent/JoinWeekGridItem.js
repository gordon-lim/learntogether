/**
 *
 * WeekGridItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Box } from '@chakra-ui/react';

export default function JoinWeekGridItem({ slot, onClick }) {
  const { numSlots } = slot;
  const { selected } = slot;

  if (numSlots === 0) {
    return (
      <Box
        as="button"
        onClick={onClick}
        width="100%"
        height={10}
        justifyContent="flex-end"
        bg={selected ? 'orange.200' : 'gray.100'}
        _hover={{
          bg: 'gray.200',
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

JoinWeekGridItem.propTypes = {
  slot: PropTypes.object,
  onClick: PropTypes.func,
};
