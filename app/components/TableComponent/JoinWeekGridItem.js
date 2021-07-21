/**
 *
 * WeekGridItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Box, useColorModeValue } from '@chakra-ui/react';

export default function JoinWeekGridItem({ slot, onClick, onSelectAvailSlot }) {
  const numSlots = slot.availSlots.length;
  const { selected } = slot;

  const defaultBackgroundColour = useColorModeValue('gray.100', 'gray.900');
  const defaultHoverBackgroundColour = useColorModeValue(
    'gray.200',
    'gray.800',
  );
  const greenBackgroundColour = useColorModeValue('green.200', 'green.900');
  const greenHoverBackgroundColour = useColorModeValue(
    'green.300',
    'green.800',
  );
  const orangeBackgroundColour = useColorModeValue('orange.200', 'orange.900');

  if (numSlots === 0) {
    return (
      <Box
        as="button"
        onClick={onClick}
        width="100%"
        height={10}
        justifyContent="flex-end"
        bg={selected ? orangeBackgroundColour : defaultBackgroundColour}
        _hover={{
          bg: defaultHoverBackgroundColour,
        }}
      >
        - Vote -
      </Box>
    );
  }

  return (
    <Box
      as="button"
      onClick={onSelectAvailSlot}
      width="100%"
      height={10}
      justifyContent="flex-end"
      bg={greenBackgroundColour}
      _hover={{
        bg: greenHoverBackgroundColour,
      }}
    >
      - {numSlots} slots -
    </Box>
  );
}

JoinWeekGridItem.propTypes = {
  slot: PropTypes.object,
  onClick: PropTypes.func,
  onSelectAvailSlot: PropTypes.func,
};
