/**
 *
 * WeekGridItem
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
import { Box } from '@chakra-ui/react';

export default function HostWeekGridItem({ slot, onClick, aveVotes }) {
  const numVotes = slot.votes.length;
  const { selected } = slot;

  let bgColor = 'green.100';

  if (numVotes === 0) {
    bgColor = 'gray.100';
  } else if (numVotes < aveVotes - 1) {
    bgColor = 'green.100';
  } else if (numVotes > aveVotes + 1) {
    bgColor = 'green.300';
  } else {
    bgColor = 'green.200';
  }

  return (
    <Box
      as="button"
      onClick={onClick}
      width="100%"
      height={10}
      justifyContent="flex-end"
      bg={selected ? 'orange.200' : bgColor}
      _hover={{
        bg: 'orange.200',
      }}
    >
      - {numVotes} votes -
    </Box>
  );
}

HostWeekGridItem.propTypes = {
  slot: PropTypes.object,
  onClick: PropTypes.func,
  aveVotes: PropTypes.number,
};
